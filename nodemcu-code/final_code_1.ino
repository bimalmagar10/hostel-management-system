/***************************************************
  This is an example sketch for our optical Fingerprint sensor

  Designed specifically to work with the Adafruit BMP085 Breakout
  ----> http://www.adafruit.com/products/751

  These displays use TTL Serial to communicate, 2 pins are required to
  interface
  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ****************************************************/


#include <Adafruit_Fingerprint.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ESP8266HTTPClient.h>

// #ifndef STASSID
// #define STASSID "binod1999_fpkhr"
// #define STAPSK  "CLB1C71782"
// #endif

#ifndef STASSID
#define STASSID "FOR QAA"
#define STAPSK  ""
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;
ESP8266WebServer server(80);


#if (defined(__AVR__) || defined(ESP8266)) && !defined(__AVR_ATmega2560__)
// For UNO and others without hardware serial, we must use software serial...
// pin #2 is IN from sensor (GREEN wire)
// pin #3 is OUT from arduino  (WHITE wire)
// Set up the serial port to use softwareserial..
SoftwareSerial mySerial(D7,D8);//RX,TX

#else
// On Leonardo/M0/etc, others with hardware serial, use hardware serial!
// #0 is green wire, #1 is white
#define mySerial Serial1

#endif


Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);
uint8_t key;
uint8_t id;
void setup()
{
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  Serial.println("");
// Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  while (!Serial);  // For Yun/Leo/Micro/Zero/...
  delay(100);
  Serial.println("\n\n Welcome to Adafruit fingerprint sensor!!");

  // set the data rate for the sensor serial port
  finger.begin(57600);
  delay(5);
  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }

  Serial.println(F("Reading sensor parameters"));
  finger.getParameters();
  // Serial.print(F("Status: 0x")); Serial.println(finger.status_reg, HEX);
  // Serial.print(F("Sys ID: 0x")); Serial.println(finger.system_id, HEX);
  // Serial.print(F("Capacity: ")); Serial.println(finger.capacity);
  // Serial.print(F("Security level: ")); Serial.println(finger.security_level);
  // Serial.print(F("Device address: ")); Serial.println(finger.device_addr, HEX);
  // Serial.print(F("Packet len: ")); Serial.println(finger.packet_len);
  // Serial.print(F("Baud rate: ")); Serial.println(finger.baud_rate);

  finger.getTemplateCount();

  if (finger.templateCount == 0) {
    Serial.print("Sensor doesn't contain any fingerprint data. Please run the 'enroll' example.");
  }
  else {
      Serial.print("Sensor contains "); Serial.print(finger.templateCount); Serial.println(" templates");
  }
  server.on("/enroll",[]() {
    loop();
  });
  server.on("/verify",[]() {
    //server.send(200,"text/plain",server.arg("plain"));
    loop();
  });
  server.on("/delete",[](){
    loop();    
  });
  server.on("/reset",[](){
    loop();
  });
}
uint8_t readnumber(void) {
  uint8_t num = 0;

  while (num == 0) {
    while (! Serial.available());
    num = Serial.parseInt();
  }
  return num;
}

void loop()                     // run over and over again
{
  server.begin();
  server.handleClient();
  //Serial.println("Please enter 1 to enroll, 2 to detect and 3 to delete the fingerprint!!");
  Serial.println("HWMS");
  if(server.uri() == "/enroll"){
    Serial.println("Begin fingerprint enrollment");
    Serial.println("Please type in the ID # (from 1 to 127) you want to save this finger as...");
    delay(10000);
    Serial.println("URI");
    Serial.print(server.uri());
    if(server.method() == HTTP_POST){
      id = server.arg("plain").substring(7).toInt();
      server.send(200, "text/plain",server.arg("plain"));
    } else {
      id = 0;
    }
    if (id == 0) {// ID #0 not allowed, try again!
      Serial.println("id is zero");
      return;
    }
    Serial.print("Enrolling ID #");
    Serial.println(id);
    if(id != 0){
      while (!getFingerprintEnroll());
    }
    server.close();
    Serial.print("Server closed");
    ESP.restart();  
  } else if (server.uri() == "/verify"){
    Serial.println("Begin fingerprint verification");
    server.send(200,"text/plain","Verification started!!");
    while(! getFingerprintID());
    server.close();
    Serial.print("Server closed");
    ESP.restart(); 
  }  else if (server.uri() == "/delete"){
    Serial.println("Begin fingerprint Deletion!!");
    Serial.println("Please type in the ID # (from 1 to 127) you want to delete...");
    delay(10000);
    // uint8_t id = readnumber();
    if(server.method() == HTTP_POST){
      id = server.arg("plain").substring(7).toInt();
      server.send(200, "text/plain",server.arg("plain"));
    } else {
      id = 0;
    }
    if (id == 0) {// ID #0 not allowed, try again!
     return;
    }

    Serial.print("Deleting ID #");
    Serial.println(id);
    deleteFingerprint(id);
    server.close();
    Serial.print("Server closed");
    ESP.restart(); 
  } else if(server.uri() == "/reset"){
      Serial.println("Begin reseting the fingerprint sensor");
      server.send(200,"text/plain","Fingerprint Sensor cleared");
      finger.emptyDatabase();
      Serial.println("Fingerprint sensor reseted!!");
      server.close();
      ESP.restart();
  }else {
    delay(1000);
    return;
  }
  
}
uint8_t deleteFingerprint(uint8_t id) {
    uint8_t p = -1;
    
    p = finger.deleteModel(id);

    if (p == FINGERPRINT_OK) {
      Serial.println("Deleted!");
    } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
      Serial.println("Communication error");
    } else if (p == FINGERPRINT_BADLOCATION) {
      Serial.println("Could not delete in that location");
    } else if (p == FINGERPRINT_FLASHERR) {
      Serial.println("Error writing to flash");
    } else {
      Serial.print("Unknown error: 0x"); Serial.println(p, HEX);
    }

    return true;
    
  // key = readnumber();
  // if(key == 1 || key == 2 || key == 3){
  //   if(key == 1){
  //     Serial.println("Begin fingerprint enroll");
  //     enroll();
  //   } else if (key == 2){
  //     Serial.println("Begin fingerprint detect test!!");
  //     Serial.println("Waiting for valid finger...");
  //     while(! getFingerprintID());
  //   } else {
  //     Serial.println("Begin fingerprint delete test!!");
  //   }
  // } else {
  //   return;
  // }
  // if(key == 2){
  //   while(! getFingerprintID());
  // } else {
  //   return;
  // }
  //delay(1000);
 // Serial.println("Hello!!!");
             //don't ned to run this at full speed.
}

void storeFingerprint(){
    if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://192.168.1.123:3000/api/nodemcu/storefingerprint"); //HTTP
    http.addHeader("Content-Type", "application/json");
    Serial.print("[HTTP] POST...\n");
    
    // start connection and send HTTP header and body
    int httpCode = http.POST("{\"msg\":\"Fingeprint Stored!!\"}");
    

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("Wifi if not connected");
  }
}

//Enrollment code

uint8_t getFingerprintEnroll() {

  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #"); Serial.println(id);
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID "); Serial.println(id);
  p = -1;
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.print(".");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
    default:
      Serial.println("Unknown error");
      break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  Serial.print("ID "); Serial.println(id);
  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    storeFingerprint();
    id=0;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  return true;
}

//Verification code

void validation(uint8_t id) {
          // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://192.168.1.123:3000/api/nodemcu/validation"); //HTTP
    http.addHeader("Content-Type", "application/json");
    int httpCode;
    Serial.print("[HTTP] POST...\n");
    if(id == 0){
      // start connection and send HTTP header and body
      httpCode = http.POST("{\"id\":\""+ String(id) +"\",\"msg\":\"Didn't find a match.\"}");
    } else {
    // start connection and send HTTP header and body
      httpCode = http.POST("{\"id\":\""+ String(id) +"\",\"msg\":\"Prints Matched\"}");
    }
    

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("Wifi if not connected");
  }
}


uint8_t getFingerprintID() {
  uint8_t p = -1;
  Serial.print("Waiting for valid finger...");
  while(p != FINGERPRINT_OK){
      p = finger.getImage();
      switch (p) {
      case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
      case FINGERPRINT_NOFINGER:
      Serial.println("No finger detected");
      Serial.println(".");
      break;
      case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      break;
      case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      break;
      default:
      Serial.println("Unknown error");
      break;
    }
  }
  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    validation(0);
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID);
  Serial.print(" with confidence of "); Serial.println(finger.confidence);

  if(finger.fingerID){
      validation(finger.fingerID);
  }
  // return finger.fingerID;
  return true;
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;

  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID);
  Serial.print(" with confidence of "); Serial.println(finger.confidence);
  // return finger.fingerID;
  if(finger.fingerID){
      validation(finger.fingerID);
  }
  return true;
}



