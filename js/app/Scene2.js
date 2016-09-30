define(['tools', 'toast'], function (tools, toast) {
    var Class = function () {
        this.$container    = document.querySelector('#scene2')
        this.$prices       = this.$container.querySelector('.prices')
        this.$imgContainer = this.$container.querySelector('.img')

        this.init()
    }

    Class.prototype = {
        construct: Class,

        init: function () {
            var that = this
            that.$container.classList.add('slideInUp')
            that.$container.classList.add('animated')
            that.$container.style.display = 'block'

            that.$prices.addEventListener('click', function () {
                var $target = event.target

                if ($target.tagName !== 'BUTTON') return

                that.judge(+$target.dataset.price, $target)
            })

            this.start()
        },

        start: function () {
            var item = GAME_PARAMS.items[0]

            $('.toast-container').remove()
            GAME_PARAMS.items.push(GAME_PARAMS.items.shift())
            this.price = (+(item.promoPrice || item.price)).toFixed(0)
            this.price = +this.price
            this.count = 3
            this.renderPrices(this.price)
            this.renderGoods(item)
        },

        renderPrices: function (price) {
            var that = this

            var prices = tools.createPrices(price)

            this.$prices.innerHTML = ''
            prices.forEach(function (item) {
                that.$prices.innerHTML += '<li class="item animated">\n    <button data-price="!{item}">!{item}</button>\n</li>'.render({
                    item: item
                })
            })

            this.judgeing = false
        },

        renderGoods: function (item) {
            this.$imgContainer.innerHTML = '\n<img src="!{picUrl}_500x500.jpg">\n<div class="title">!{title}</div>'.render({
                picUrl: item.picUrl,
                title : item.title
            })
        },

        judge: function (price, $target) {
            var that = this

            if (this.judgeing) return

            price         = +price
            this.judgeing = true
            this.count--

            var resultMap = {
                ok  : ['flip', '😘 没错, 就是这个价!', 3000],
                high: ['fadeIn', '😂 太高了', 3000],
                low : ['fadeIn', '😓 太低了', 3000]
            }

            var result = price === this.price ? 'ok' : price > this.price ? 'high' : 'low'

            if (result !== 'ok') {
                $target.setAttribute('disabled', 'disabled')
                $target.classList.add('disabled')
            } else {
                $target.classList.add('success')
            }

            $target.classList.add('animated')
            $target.classList.add(resultMap[result][0])
            tools.animationEvent($target, 'AnimationEnd', function () {
                that.judgeing = false
                $target.classList.remove(resultMap[result][0])
                toast({content: resultMap[result][1], time: resultMap[result][2]})

                if (result === 'ok') {
                    that.judgeing = true
                    setTimeout(function () {
                        that.gamePass()
                    }, 1200)

                    return
                }

                if (that.count < 0) {
                    that.judgeing = true
                    setTimeout(function () {
                        that.gameOver()
                    }, 500)
                }

            })
        },

        gamePass: function () {
            GameDialog.success({
                content: '<div class="only-text">恭喜您获得了抽奖机会!</div>',
                btn1   : {
                    title: '马上抽奖',
                    click: function () {
                        GameDialog.close()
                        GameDialog.win(3, 100)
                    }
                }
            })
        },

        gameOver: function () {
            var that = this

            GameDialog.fail({
                btn1: {
                    title: '再来一次',
                    click: function () {
                        GameDialog.close()
                        that.start()
                    }
                }
            })
        }
    }

    return Class
})