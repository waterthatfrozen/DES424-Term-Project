*** Comments ***
This is a test script for video upload and delete video to QikVid App

*** Settings ***
Library    SeleniumLibrary
Library    XML
Library    OperatingSystem

*** Variables ***
${BROWSER}    chrome
${URL}    http://localhost:3000
${USERNAME}    time            # Change this to your username
${PASSWORD}    12345678        # Change this to your password
${VIDEO}    D:/SIIT-Y4-Work/DES424/DES424-Term-Project/testing/file/Azure_Bumper.mp4    # Change this to your video file path
${VIDEO_DESCRIPTION}    This is a test script for video upload to QikVid App            # Change this to your video description
${DELAY}    0.5

*** Test Cases ***
1. Open Browser
    Open Browser    ${URL}    ${BROWSER}    options=add_experimental_option("excludeSwitches", ["enable-logging"])
    Maximize Browser Window
    Set Screenshot Directory    ./testing/screenshot
    Set Selenium Speed    ${DELAY}
2. Go to Log In Page
    Click Element    id=nav-user-icon
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Log In
3. Enter Log In Account
    Input Text    id=login-username-input    ${USERNAME}
    Input Password    id=login-password-input    ${PASSWORD}
    Click Button    id=login-signin-btn
4. Go to Upload Page
    Wait Until Element Is Visible    xpath=//*[@id="nav-upload-icon"]
    Click Element    id=nav-upload-icon
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Upload Your Video
5. Upload Video
    Choose File    id=upload-choosefile-btn    ${VIDEO}
    ${VIDEO_NAME}    Get Text    xpath=//*[@id="upload-choosefile-btn"]
    Input Text    xpath=//*[@id="upload-description-input"]    ${VIDEO_DESCRIPTION}
    Click Button    id=upload-submit-btn
6. Wait for Video to be Upload
    Alert Should Be Present    timeout=120 s    text=Video Uploaded Successfully
7. Verify Video
    Click Element    xpath=//*[@id="nav-user-icon"]
    ${LOGIN_USERNAME}    Get Text    xpath=//h2
    Should Contain    ${LOGIN_USERNAME}    ${USERNAME}
    ${EXPECTED_VIDEO}    Get Text    xpath=//span[contains(text(),'${VIDEO_DESCRIPTION}')]
    # Log To Console    ${EXPECTED_VIDEO}
    Should Contain    ${EXPECTED_VIDEO}    ${VIDEO_DESCRIPTION}
8. Delete Video
    Click Element    xpath=//*[@id="videocontainer-bin-icon"]
    Alert Should Be Present    timeout=120 s    text=Delete video successfully
9. Verify Video Deleted
    Wait Until Element Is Visible    xpath=//*[@id="nav-user-icon"]
    Click Element    xpath=//*[@id="nav-user-icon"]
    ${VIDEO_DELETED}    Get Text    xpath=//span
    Should Not Contain    ${VIDEO_DELETED}    ${VIDEO_DESCRIPTION}
10. Log out
    Click Element    id=user-logout-btn
    ${PAGE_TITLE}    Get Text    xpath=//h1
    Should Contain    ${PAGE_TITLE}    Log In
11. Close Browser
    Close Browser