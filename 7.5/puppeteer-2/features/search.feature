Feature: booking a seat on the cinema
    Scenario: Should choose a day and movie
        Given user is on "/client/index.php" page
        When user select day '3'
        When user select movie '190'
        Then user sees movie title "Унесенные ветром."

     Scenario: Should book a seat on a choosen movie
        Given user is on "/client/index.php" page
        When user select day '3'
        When user select movie '190'
        When user select row '3' and seat '8'
        When user click on a booking button 
        Then user sees movie title on a booking page "Унесенные ветром."

     Scenario: Should book a a multiple number of seats on a choosen movie
        Given user is on "/client/index.php" page
        When user select day '3'
        When user select movie '190'
        When user select row '3' and seat '8'
        When user select row '4' and seat '7'
        When user select row '2' and seat '1'
        When user click on a booking button 
        Then user sees movie title on a booking page "Унесенные ветром."

    Scenario: Shouldn't book a seat on a choosen movie if the seat is not choosen
        Given user is on "/client/index.php" page
        When user select day '3'
        When user select movie '190'
        Then user can't click on a submit button