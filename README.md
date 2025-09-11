# Heart Rate and Energy Monitoring App
## Property of Stirling Lab ##
### Espruino Web IDE
	 https://www.espruino.com/ide/

## Overview

This is a lightweight app designed for Bangle.js that monitors heart rate, calculates cumulative energy expenditure in kilojoules (kJ), and alerts the user if energy output approaches a predefined threshold. The app offers a real-time display of data and incorporates interactive functionality to start/stop monitoring and dismiss warnings.

## Features
	1.	Heart Rate Monitoring:
	    		Continuously tracks heart rate readings.
	    		Filters and processes readings with a confidence level >50%.
	2.	Energy Calculation:
    			Estimates metabolic rate using gender, weight, and age.
    			Calculates and displays cumulative energy expenditure (kJ).
	3.	Warning System:
    			Issues a warning when energy expenditure nears a configurable threshold.
    			Displays a dismissible warning message.
	4.	Interactive Monitoring:
    			Starts/stops monitoring via button press.
    			Adjusts screen brightness dynamically during monitoring.
	5.	Customizable Parameters:
    			User-configurable weight, age, and gender.
    			Adjustable maximum energy (BTU) threshold.

## How It Works

### Key Functions:
	1.	calculateMetabolicRate(hr):
    			Computes the metabolic rate based on heart rate, gender, weight, and age.
	2.	updateCumulativeKJ():
    			Updates energy expenditure every 20 seconds.
    			Triggers a warning if energy approaches the maximum threshold.
	3.	onHeartRateReading(h):
    			Processes incoming heart rate readings.
    			Maintains a rolling 20-second data window.
	4.	redisplayData():
    			Updates the graphical display with the latest data.
	5.	Button Press Handling:
    			Toggles monitoring and adjusts display brightness.
    			Resets energy data when monitoring is stopped.

### Setup
	1.	Install on Bangle.js:
    			Upload the script (bangle.12.18.js) to your device using the [Espruino IDE](https://www.espruino.com/ide/).
    			The Espruino IDE is an online environment that simplifies uploading JavaScript code to Espruino devices. Access it here: Espruino IDE.
	2.	Configuration:
    			Modify config at the top of the script to set your:
    			Weight (kg)
    			Age
    			Gender (0 = female, 1 = male)
    			Adjust maxBTU if necessary (default is 5000 BTU).
	3.	Start Monitoring:
    			Press the designated button to start or stop monitoring.
    			The app initializes with a message prompting the user to start.

### Usage Instructions
	1.	Starting the App:
    			Upon running the script, the display will prompt: “Press Button to Start.”
    			Press the button to begin monitoring.
	2.	Monitoring:
    			The app will track your heart rate and update cumulative kJ burned.
    			Real-time data is displayed on the screen.
	3.	Warnings:
    			If energy output nears the set maximum threshold, a warning will appear.
    			Tap the screen to dismiss the warning and resume updates.
	4.	Stopping Monitoring:
    			Press the button again to stop monitoring.
    			The app will dim the screen and reset energy data.

### Customization
	  To adapt the app to your needs:
    		Update Interval: Modify updateInterval to adjust the refresh rate (default is 20 seconds).
    		Maximum Energy Threshold: Change maxBTU to set a new limit.
    		Brightness Settings: Adjust Bangle.setLCDBrightness() values to suit your preferences.

### Technical Details
    	Heart Rate Data:
    		Collected via Bangle.js’s HRM (Heart Rate Monitor) event.
    		Data points are stored for the past 20 seconds to calculate averages.
    		Energy Conversion:
    		Uses kilojoules (kJ) as the unit of energy.
    		Converts BTU to kJ for warning thresholds (1 BTU ≈ 1.055 kJ).

### Known Limitations
    	Heart Rate Confidence:
    		Relies on readings with confidence >50%. Inconsistent readings may affect calculations.
    		Threshold Warnings:
    		Users should ensure the maxBTU value is set appropriately to avoid false alerts.

### Future Improvements
    	User interface enhancements for better usability.
    	Option for users to adjust configurations directly on the device.
    	Additional metrics (e.g., calories, steps).

Access the Espruino IDE to upload this code seamlessly to your Bangle.js device

Contact me at yuleifu@umich.edu
