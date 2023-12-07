# Chatting-WebsiteModule-EndToEnd-Encrypted
WebModule in which user can send real time messages to any registered user of website,and receive also.All sent received messages against users will be encrypted/decrypted and messages will be stored in mongo db in encrypted form.
  
Four independent layers:  
1) React ,FrontEnd  
2) Backend, NodeExpress js server of website with encryption and decryption of messages using AES technique + MongoDb  
3) Backend, Python Flask server just for encryption and decryption of messages using DES and Blowfish Algorithm
4) Socket server
