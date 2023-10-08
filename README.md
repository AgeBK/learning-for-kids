# Initial idea - 08/09/2023

I was watching my son doing some online learning homework and got the idea to build a kid's website where they could improve their Maths and Spellingx skills

I want my son to be able to choose between either maths or spelling, then have a countdown timer and either random maths questions or random images are generated/displayed which he can answer. I'm thinking of including a record table or a 'Top 10 scores style table' to keep track of progress

# What I built

So, I stuck to the original idea, the user has a choice of doing maths (addition or subtraction) or spelling. After choosing, a timer is displayed showing 1 minute, the user then can start the timer and either random maths questions are presented or random images where the user must spell the word. When the timer reaches zero, a final tally is presented and can be viewed in a leaderboard which I store in local storage

# Features

- 15 Components
- Count down timer (changes colour each second) which can be reset
- Live results of the current challenge
- Top scores which can be sorted by position (default) and by date
- Random colours on the timer and the username
- Audio: sounds are played for correct/incorrect answers, also sounds at the beginning and end of a challenge
- Uses unsplash-js for image searches used in spelling challenges. A word is randomly selected from an array and an image search is performed

# How it works

- 1: The user must enter a username
- 2: When a name is entered, the user is presented with the challenge options (maths or spelling) and the timer. If maths is selected, the user can also select either addition or subtraction
  3: When ready, the user can click the start button. Ready, set, go is displayed (each word 1 second apart) then the timer and the first question will be displayed
  4: The aim for the user is to answer as many questions as possible before the timer runs out
  5: When the time is up, the timer stops, finished is displayed and the users' results are displayed in the records table which is saved in local storage

09/10/2023

- different backgrounds for maths/spelling
- refactoring/styling

05/10/2023

- Refactoring and testing
- Style changes

27/09/2023

- Integrating Spelling Component (had to modify Results, Question, Challenge, Maths (might rename Maths, doesn't make sense now)
- Style changes

24/09/2023

- Started work on the Spelling component
- Installed unsplash-js (Photo search API)
- Changed Results component to accommodate Spelling

23/09/2023

- Implemented memo, useMemo and useCallback to prevent unnecessary rerenders
- Created Button component
- Styling/refactoring/responsive changes

22/09/2023

- Updated Timer
- Fixed bug in subtraction
- Moved Question and Results out of Maths into their own components

19/09/2023

- Modified RandomColour component to accept arrays
- Style changes + started responsive

18/09/2023

- Created Section container (common style + section tag)
- Created Random colour components
- Style changes/refactoring

16/09/2023

- Fixed some timing issues
- Style changes
- Fixed bug in records component

13/09/2023

- Record component displaying results + styling
- Added timing functionality
- Initial workflow (Enter name, answer questions, check answers for questions)
- Live results from questions answered
- Basic styling

08/09/2023

- Initial set up using create react app
- Created 4 components, Maths, Spelling, Records & Timer
- Started working on Maths component + some basic styling
- Downloaded some images for background ect
