import tools, {toast} from './Tools'


export default class Scene2 {
    constructor() {
        this.$container    = document.querySelector('#scene2')
        this.$prices       = this.$container.querySelector('.prices')
        this.$imgContainer = this.$container.querySelector('.img')

        this.init()
    }

    init() {
        this.$container.classList.add('slideInUp')
        this.$container.classList.add('animated')
        this.$container.style.display = 'block'

        this.$prices.addEventListener('click', (event) => {
            let $target = event.target

            if ($target.tagName !== 'BUTTON') return

            this.judge(+$target.dataset.price, $target)
        })

        this.start()
    }

    start() {
        let item = GAME_PARAMS.items[0]

        $('.toast-container').remove()
        GAME_PARAMS.items.push(GAME_PARAMS.items.shift())
        this.price = +(item.promoPrice || item.price)
        this.count = 3
        this.renderPrices(this.price)
        this.renderGoods(item)
    }

    renderPrices(price) {
        let prices = tools.createPrices(price)

        this.$prices.innerHTML = ''
        prices.forEach((item) => {
            this.$prices.innerHTML += `
        <li class="item animated">
            <button data-price="${item}">${item}</button>
        </li>`
        })

        this.judgeing = false
    }

    renderGoods(item) {
        this.$imgContainer.innerHTML = `
            <img src="${item.picUrl}_500x500.jpg_.webp">
            <div class="title">${item.title}</div>
`
    }

    judge(price, $target) {
        if (this.judgeing) return

        price = +price

        this.judgeing = true
        this.count--

        let resultMap = {
            ok  : ['flip', '😘 没错, 就是这个价!', 3000],
            high: ['fadeIn', '😂 太高了', 3000],
            low : ['fadeIn', '😓 太低了', 3000]
        }
        let result    = price === this.price ? 'ok' : price > this.price ? 'high' : 'low'

        if (result !== 'ok') {
            $target.setAttribute('disabled', 'disabled')
            $target.classList.add('disabled')
        } else {
            $target.classList.add('success')
        }

        $target.classList.add('animated')
        $target.classList.add(resultMap[result][0])
        tools.animationEvent($target, 'AnimationEnd', () => {
            this.judgeing = false
            $target.classList.remove(resultMap[result][0])
            toast({content: `${resultMap[result][1]}`, time: resultMap[result][2]})

            if (result === 'ok') {
                setTimeout(() => {
                    this.gamePass()
                }, 1200)

                return this.judgeing = true
            }

            if (this.count < 0) {
                this.judgeing = true
                setTimeout(() => this.gameOver(), 500)
            }

        })
    }

    gamePass() {
        dialog.success({
            content: '<div class="only-text">恭喜您获得了抽奖机会!</div>',
            btn1   : {
                title: '马上抽奖',
                click: () => {
                    dialog.close()
                    dialog.win(3, 100)
                }
            }
        })
    }

    gameOver() {
        dialog.fail({
            btn1: {
                title: '再来一次',
                click: () => {
                    dialog.close()
                    this.start()
                }
            }
        })
    }
}