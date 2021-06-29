# electron beginner

this project is from my learing result of the [electron course](https://gitee.com/geektime-geekbang/geektime-electron).

## how to run

```shell
npm install
# goto a project root folder
npm start
```

### to run chapter 2

- please rebuild electron first at the root folder

   ```shell
   # run it at root folder rather than project folder
   ./node_modules/.bin/electron-rebuild
   ```

- or directly build robotjs

   ```shell
   npm rebuild --runtime=electron --target=13.1.4 --disturl=https://atom.io/download/atom-shell --abi=89
   ```

   >to get the parameters as below  
   >- target: electron -v
   >- abi: electron -a
   >
   >for details, please refer to  
   > https://github.com/octalmage/robotjs/wiki/Electron  
   > https://www.npmjs.com/package/robotjs#building


