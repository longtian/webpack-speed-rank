# webpack-speed-rank
![](https://img.shields.io/npm/v/webpack-speed-rank.svg)
![](https://img.shields.io/npm/dm/webpack-speed-rank.svg)
![](https://img.shields.io/npm/l/webpack-speed-rank.svg)
![](https://img.shields.io/travis/wyvernnot/webpack-speed-rank.svg)
![](https://img.shields.io/coveralls/wyvernnot/webpack-speed-rank.svg)

Speed rank for webpack build

Do you want to know how slow is your build compared to others? Install this plugin and it will tell you.

For example, you can show customized infomation in console like this:
 
> 耗时 8732 ms,打败了 XXX % 的build


## Documents

`RankPlugin(redisOptions,callback)`

Parameters:

`redisOptions`

```
{
 host:'127.0.0.1',
 port:6379
}
```

or 

```
redis://localhost:6379
```

`callback(error,stats)`

stats is an object looking like this

```
{
startTime: // start time of the build
endTime: // end time of the build
duration: // duration of the build in ms
rank: // rank percentage
}
```

## Dependency

`webpack-speed-rank` relies on Redis server, by default it will connect to localhost:6379

## Usage:

Modify you webpack configuration file
```js
 var RankPlugin= require('webpack-speed-rank');

 plugins:[
  ...
  ,new RankPlugin({
                    host:'127.0.0.1',
                    port: 6379
                  },function (e,stats) {
                      console.log('耗时 %d ms,打败了 %d % 的build', stats.duration, stats.rank);
                  });
 ]
 
```

