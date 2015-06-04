# UTI-Nurse

## DESCRIPTION
AmandaCare is a mobile application that helps those who are suspicious of having a UTI to conveniently submit their symptoms for a quick diagnosis. AmandaCare requires two front ends (patient and nurse) and the UTI-Nurse repository provides the code for the nurse side of the application. 
The key components of the nurse front end include reviewing/approving cases and viewing patients' personal/medical information.

## SYSTEM REQUIREMENTS
* iOS 8.0.0+
* [AngularJS 1.3+](https://github.com/angular/angular.js)
* [Parse.js 1.4.2+](https://parse.com/downloads/javascript/parse-1.4.2.min.js)
* [Node.js 0.12.0+](https://nodejs.org/)
* [AppGyver Steroids](http://www.appgyver.com/steroids)

## INSTALLATION

1. First step is to install Steroids.
>Follow the [instructions](https://academy.appgyver.com/installwizard/steps#/home) for getting and installing Supersonic.

2. The next step is to make a folder on your local machine by cloning.
>```bash
$git clone https://github.com/eecs394-spr15/UTI-Nurse.git
>```
3. This application requires a back-end server to store user data. 
>You can create a [Parse account](https://www.parse.com/signup) for this back-end purpose.

  *NOTE: Make sure you never include your Parse master key in any binary. Put cloudcode/config/global.json into their GLOBAL gitignore settings and remove the global.json file from all your github repos.*

4. In case you wish to run the codes on a simulator, you can run the following command in the corresponding directory
`$ steroids connect`
*If Steroids asks for an update, you can run this command before connecting to Steroids*
`$ steroids update`
5. Finally you can run simulator on your computer or download **AppGyver Scanner** in the App Store on your mobile side.


## DEPLOYMENT

For the basic deployment steps,
>Follow the [Supersonic deployment instructions](http://docs.appgyver.com/tooling/build-service/build-settings/deploying-to-cloud/).

You also need to create an ad hoc build.
>Follow the instructions for [an ad hoc build](http://docs.appgyver.com/tooling/build-service/build-settings/building-a-debug-build/) This type of app can be installed on devices for testing but can't be placed on the Apple App Store. Distribution versions need approval from Apple for the App Store for enterprise-level distribution. Approval can take weeks.

**Pay Attention:To deploy to iOS, you must have an Apple developer license, and a Macintosh with the current version of MacOS and Xcode. Xcode is a free download from Apple, but developer licenses cost about $100 per year.**

## ISSUES & LIMITATIONS
* This application only works on iOS8
* Nurse has no way of closing a finished UTI submission, which would result in a way-too-big list after some amount of actual use

## CURRENT FEATURES
* Mock login page
* See list of UTI submissions with their status - denied if a hospital visit is reccomended, approved if an antibioitic has been presecribed, and pending if the nurse has yet to take action
* On a given UTI submission, the nurse can view the patient's profile as well as current UTI symptoms
* The app automatically reccomends the proper antibiotics to the nurse based on the patient's allergies
* The nurse can approve or deny a submission; this information is then tranferred to the respective patient through the Parse database



## FEATURES TO BE ADDED
* Credit card needs actual security measures
* Nurse can clear list of UTI submissions
* Sort list of cases 
* Connection with pharmacy, actual integration
* Nurse individual login
* Patient survey before receiving result
