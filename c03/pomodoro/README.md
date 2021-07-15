# pomodoro

## to run

```
npm install
npm start
```

## to distribute

```
npm install
npm run pack:mac
npm run pack:win
```

## to generate icons

please refer to https://www.electron.build/icons

- uses the tools `electron-icon-maker`

  ```shell
  electron-icon-maker --input=icon.png --output=./res/icons
  ```

- or easy to generate on Mac

  please run the bash file `gen-icons.sh`
  
  ```shell
  ./gen-icons.sh icon.png
  ```
