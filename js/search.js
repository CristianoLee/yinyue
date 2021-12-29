
window.addEventListener('load', function () {
    // 通用区域js
    load();
    function load() {
        // console.log(1);
    }
    // search区域js
    searchArea();
    function searchArea() {
        var music = new Vue({
            el: '#main',
            data: {
                // 发现区域显示状态
                indexShow: true,
                // 搜索区域显示状态
                searchShow: false,
                // 皮肤盒子显示状态
                isSkinShow: false,
                // 皮肤当前样式
                skinBlue: false,
                skinWhite: false,
                skinBlack: false,
                // 搜索盒子显示状态
                navShow: false,
                // 搜索关键字
                queryValue: '',
                // 歌曲数组
                musicList: [],
                // 歌曲地址
                musicUrl: '',
                // 歌曲封面地址
                musicPicurl: '',
                // 歌曲评论
                hotComments: [],
                // 动画播放状态
                discShow: false,
                // 歌曲信息显示状态
                songInfoShow: false,
                // MV显示状态
                mvShow: false,
                // mv地址
                mvUrl: '',
                // 歌手集合
                singerName: '',
                // 歌曲时间集合
                songTime: '',
                // 收藏列表
                collectionList: [],
                // 歌曲收藏状态
                isCollection: false,
                // 收藏歌曲盒子显示状态
                collectionBoxShow: false,
                // 控制节流阀
                allFlag: true,
            },
            created() {

            },
            methods: {
                // 搜索歌曲
                searchMusic: function () {
                    this.indexShow = false;
                    this.searchShow = true;
                    this.navShow = true;
                    var that = this;
                    axios.post('https://autumnfish.cn/search?keywords=' + this.queryValue)
                        .then(function (response) {
                            that.musicList = response.data.result.songs;
                            // 将集合中有用的数据重新装填
                            for (let i = 0; i < that.musicList.length; i++) {
                                // 获取歌手数量
                                var singerNum = that.musicList[i].artists.length;
                                // 将歌手名隔开
                                var aheadSingerName; // 前面的歌手名称
                                var lastSingerName; // 最后一个歌手名称
                                var singerNameAll; // 此歌曲所有歌手名称
                                for (let j = 0; j < singerNum; j++) {
                                    // 如果歌手数量超过1人，并且不是最后1位，用/隔开
                                    if (singerNum != 1) {
                                        if (j != singerNum - 1) {
                                            aheadSingerName = that.musicList[i].artists[j].name + '/';
                                        } else {
                                            lastSingerName = that.musicList[i].artists[j].name;
                                        }
                                        singerNameAll = aheadSingerName + lastSingerName;
                                    } else {
                                        singerNameAll = that.musicList[i].artists[j].name;
                                    }
                                }
                                var songMinte = Math.round(that.musicList[i].duration / 1000 / 60); // 歌曲分钟时长
                                var songSecond = Math.round(that.musicList[i].duration / 1000 % 60); // 歌曲秒时长
                                // 格式化的歌曲时间
                                songMinte = songMinte < 10 ? '0' + songMinte : songMinte;
                                songSecond = songSecond < 10 ? '0' + songSecond : songSecond;
                                var time = songMinte + ':' + songSecond;
                                that.musicList[i] = { id: that.musicList[i].id, name: that.musicList[i].name, singerName: singerNameAll, songTime: time, mvid: that.musicList[i].mvid };
                            }
                            console.log(that.musicList);
                            if (that.musicList == null) {
                                alert('您的搜索有误');
                                that.queryValue = '';
                            }
                        }).catch(function (err) {
                            console.log(err);
                        })
                },
                // 播放歌曲
                playMusic: function (musicId) {
                    var that = this;
                    that.musicUrl = 'https://music.163.com/song/media/outer/url?id=' + musicId;
                    that.musicPicurl = '';

                    // 获取歌曲图片
                    axios.post('http://music.eleuu.com/song/detail?ids=' + musicId)
                        .then(function (response) {
                            // console.log(response);
                            that.musicPicurl = response.data.songs[0].al.picUrl;
                        }).catch(function (err) {
                            console.log(err);
                        })
                    // 获取歌曲评论
                    axios.post('http://music.eleuu.com/comment/hot?type=0&id=' + musicId)
                        .then(function (response) {
                            // console.log(response);
                            that.hotComments = response.data.hotComments;
                        }).catch(function (err) {
                            console.log(err);
                        })


                    // axios.get('https://music.163.com/song/media/outer/url?id=', + musicId)
                    //     .then(function (response) {
                    //         // console.log(response);
                    //         let url = response.data.data[0].url;
                    //         if (url != null) {
                    //             that.musicUrl = url;
                    //             // 获取歌曲图片
                    //             axios.post('http://music.eleuu.com/song/detail?ids=' + musicId)
                    //                 .then(function (response) {
                    //                     // console.log(response);
                    //                     that.musicPicurl = response.data.songs[0].al.picUrl;
                    //                 }).catch(function (err) {
                    //                     console.log(err);
                    //                 })
                    //             // 获取歌曲评论
                    //             axios.post('http://music.eleuu.com/comment/hot?type=0&id=' + musicId)
                    //                 .then(function (response) {
                    //                     // console.log(response);
                    //                     that.hotComments = response.data.hotComments;
                    //                 }).catch(function (err) {
                    //                     console.log(err);
                    //                 })
                    //         } else {
                    //             this.songInfoShow = false;
                    //             this.discShow = false;
                    //             alert("此歌曲资源丢失");
                    //         }
                    //     }).catch(function (err) {
                    //         console.log(err);
                    //     })

                },
                // 歌曲播放
                play: function () {
                    this.songInfoShow = true;
                    this.discShow = true;
                    this.mvShow = false;
                },
                // 歌曲暂停
                pause: function () {
                    this.discShow = false;
                },
                // 收藏歌曲
                songCollection(item) {
                    // 将歌曲添加到本地存储
                    var collectionSong = { songId: item.id, songName: item.name, singerName: item.singerName, songDuration: item.songTime, mvid: item.mvid };
                    // 获取本地存储数据集合
                    let collectionList = this.getData();
                    // 判断歌曲是否已经收藏
                    var flag = true;
                    for (let i = 0; i < collectionList.length; i++) {
                        if (collectionSong.songId == collectionList[i].songId) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        // 向收藏集合添加歌曲对象
                        collectionList.push(collectionSong);
                        // 保存进本地存储
                        this.save(collectionList);
                        // this.collectionBoxShow = true;
                        // var test = this.$refs.test;
                        // if (this.allFlag) {
                        //     this.allFlag = false;
                        //     this.collectionBoxHide(test, function () {
                        //         console.log(this.collectionBoxShow);
                        //         this.collectionBoxShow = false;
                        //         console.log(this.allFlag);
                        //         this.allFlag = true;
                        //     })
                        // }

                    } else {
                        if (confirm('您已收藏此歌曲，是否取消收藏')) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                // 让收藏盒子慢慢消失
                // collectionBoxHide(obj, callBacll) {
                //     obj.style.opacity = 1;
                //     setTimeout(() => {
                //         setInterval(() => {
                //             obj.style.opacity -= 0.01;
                //         }, 15);
                //     }, 1500)
                // },
                // 获取本地存储歌曲集合
                getData() {
                    // 获取数据
                    this.collectionList = localStorage.getItem('collectionList');
                    // 如果数据不为空返回转化为对象形式的数据
                    if (this.collectionList !== null) {
                        return JSON.parse(this.collectionList);
                    } else {
                        return [];
                    }
                },
                // 保存歌曲到本地存储
                save(collectionList) {
                    localStorage.setItem('collectionList', JSON.stringify(collectionList))// 将数据转化为字符串存入本地数据
                },
                // 删除本地存储的歌曲
                // removeCollction() {
                //     // 获取数据
                //     let collectionList = getData();
                //     // 查找需要删除的数据索引值
                //     let index = $(this).attr('id');
                //     // 删除该数据
                //     data.splice(index, 1);
                //     // 保存数据
                //     save(collectionList);
                //     // 刷新数据
                //     load();
                // },
                // 播放MV
                playMv: function (mvid) {
                    var that = this;
                    axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
                        .then(function (response) {
                            console.log(response);
                            that.mvUrl = response.data.data.url;
                            if (that.mvUrl != null) {
                                that.mvShow = true;
                            } else {
                                that.mvShow = false;
                                that.mvUrl = '';
                                alert("此MV资源丢失");
                            }
                            that.songInfoShow = false;
                        }).catch(function (err) {
                            console.log(err);
                        })
                },
                // 隐藏mv
                mvHide: function () {
                    this.mvShow = false;
                    this.songInfoShow = true;
                    this.mvUrl = '';
                },
                // 点击去除nav
                clearNav() {
                    this.toggleIndexContent();
                    this.navShow = false;
                    this.musicList = [];
                },
                // 切换内容区域显示状态
                toggleIndexContent() {
                    this.indexShow = true;
                    this.searchShow = false;
                },
                toggleMyContent() {
                    // this.indexShow = true;
                    // this.searchShow = false;
                },
                toggleSearchContent() {
                    this.indexShow = false;
                    this.searchShow = true;
                },
                // 点击切换皮肤盒子显示状态
                toggleSkin() {
                    this.isSkinShow = !this.isSkinShow;
                },
                changeBlue() {
                    console.log('蓝色');
                    this.skinWhite = false;
                    this.skinBlack = false;
                },
                changeWhite() {
                    console.log('白色');
                    this.skinWhite = true;
                    this.skinBlack = false;
                },
                changeBlack() {
                    console.log('黑色');
                    this.skinBlack = true;
                    this.skinWhite = false;
                }
            }
        })
    }
    // index区域js
    indexArea();
    function indexArea() {
        var img = this.document.querySelector('.pic');
        var ol = document.querySelector('ol');
        var flag = true; // 节流阀控制图片
        // 把这些图片路径放入一个数组
        var imgArr = [
            "images/1.jpg",
            "images/2.jpg",
            "images/3.jpg",
            "images/4.jpg",
            "images/5.jpg"
        ];
        var index = 0; // 图片当前索引值
        // 生成对应图片个数的li
        for (let i = 0; i < imgArr.length; i++) {
            // 创造li
            var li = this.document.createElement('li');
            // 将li添加到ol中
            ol.appendChild(li);
            changeImg();
            // 点击li按钮切换到相应图片
            ol.children[i].onclick = () => {
                flag = false;
                index = i;
                changeImg();
                circleChange(index);
                this.setTimeout(function () {
                    flag = true;
                }, 5000);
            }
        }

        circleChange(index);
        // 鼠标经过静止图片轮播
        img.onmouseover = () => {
            flag = false;
        }
        // 鼠标离开图片继续轮播
        img.onmouseleave = () => {
            flag = true;
        }

        // 此方法给图片添加路径
        function changeImg() {
            img.src = imgArr[index];
        }

        // 回到上一张图片
        function prev() {
            if (index == 0) {
                index = imgArr.length - 1;
            } else {
                index--;
            }
            changeImg();
        }

        // 去下一张图片
        function next() {
            if (flag) {
                if (index == imgArr.length - 1) {
                    index = 0;
                } else {
                    index++;
                }
                circleChange(index);
                changeImg();
            }

        }
        var timer = setInterval(function () {
            next();
        }, 5000);
        // 按钮随着图片变化
        function circleChange(index) {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].style.backgroundColor = '';
            }
            ol.children[index].style.backgroundColor = 'rgba(255, 255, 255,0.9)';
        }
    }
})
console.log("%c页面加载完毕！消耗了" + Math.round(performance.now() * 100) / 100 + "ms", "background-color:#282c34;color:#51aded");

// #282c34;#51aded;