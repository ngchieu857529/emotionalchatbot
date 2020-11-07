!["Soulful.AI"](./public/img/logo.JPG)

# WELCOME TO [SOULFUL.AI](https://github.com/ngchieu857529/emotionalchatbot.git) - Inspired by Use Case #4 for Hack-a-Roo Fall 2020
Follow the steps below to get started!

## Prerequisite
Must have React Native, Git and Node.js globally installed on your computer!
- Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Node.js: Node.js: https://nodejs.org/en/download/
- React Native: once you installed node.js, open your terminal/command line of your choice and run this command: `npm install -g react-native-cli`

## Set Up Development Environment
- Follow the instruction in this link to set up accordingly based on your computer (Windows or Mac): https://reactnative.dev/docs/environment-setup

## Get Started!
Once you have everything configured, follow the steps below to run the app:
- Open command line of your choice and clone the project: `git clone https://github.com/ngchieu857529/emotionalchatbot.git`
- Direct into the cloned folder: `cd emotionalchatbot`
- (This third step can be different for different machine. Here, we are using Android emulator to run the app) Open Android Studio and run an emulator. Wait for everything to load
- Go back to the command line and run: `react-native run-android`
=> DONE! An app should appear on your Android emulator. If you are facing any issues, look up the internet to resolve the errors! Have fun chatting with the bot!

## Resources
- PowerPoint slides: https://1drv.ms/p/s!AmtRtv41fFQLhfc0AkggDc3ipIjwPw?e=gM4h1j
- Sample video: https://vimeo.com/476544586
- Google Colaboratory bot models: 
    Friendly Mode: https://colab.research.google.com/drive/1A3T2sWRqk6qeURpALyEYxTv_w41fr9I0?usp=sharing
    Critical Mode:https://colab.research.google.com/drive/1wsS6uYLYzk3dcgPtOrVFVWrpAv9ZAj61?usp=sharing
Features:
Friendly mode:
2 settings:
User vs Bot: 
The chatbot will interact with the user mostly in the sympathetic and empathetic way.
Helps user relieve potential stress, anxiety, and depression from COVID or personal issues.
Bot vs Bot (automatic):
Two separate models (trained with different personality) will have a short conversation with each other. Roles may vary.
For example, model 1 can be a depressed person while model 2 is the therapist or a comforter (as the example below). Please note that in this case the user acts only as a Moderator or Initiator of the Conversation while the rest is automatically performed by the models).
Disclaimer: questions asked in the examples are random and not indicative of any political bias on our side. We reserved have no political standpoints throughout this experiment. All comments hereby produced by the models are inherited by Reddit users.

Critical mode:
2 settings:
User vs Bot: 
The chatbot will express mostly in a critical manner.
Helps user dig deeper into a controversial topic or simply understand conflicting viewpoints.
Bot vs Bot (automatic):
Two separate models (trained with different perspectives) will have a short conversation with each other. Roles may vary.
For example, model 1 can be Republican supporter while model 2 can be a Democratic supporter. Please note that in this case the user acts only as a Moderator or Initiator of the Debate/Discussion and the rest is performed automatically performed by the models.

Implementation:
An ensemble of models was built on Google Colaboratory, consisting of 4-5 different models suitable for different knowledge domains.
The NLP framework is HuggingFace, the leading open-source framework for NLP solutions using Transformers built on top of PyTorch.
The mobile application was built on Android via the React Native framework, one of the most popular choices for developing robust cross-platform applications using JavaScript.  The multiplatform-compatible framework was developed by Facebook for ease of building native applications.


Future Scope:

Human in the loop: Real-time feedback
Multiple simultaneous messages from each side.
More knowledge domains
UI improvement
Model deployment on the Cloud (Amazon AWS, Microsoft Azure, …)
Application Deployment in Google Playstore
Multi-modality Analysis:
Natural Language Processing
Object Detection (to interpret user’s uploaded images)
User Sentiment Analysis
Diverse text-to-speech models (gender-based, age-sensitive, and more natural-sounding)
Speech-to-text features (to simulate phone calls or Facetiming)

References:
https://reactnative.dev/
https://github.com/microsoft/DialoGPT
https://github.com/huggingface/transformers
https://www.reddit.com/r/depression/
https://www.reddit.com/dev/api/
https://www.reddit.com/r/Coronavirus/
https://pytorch.org/


