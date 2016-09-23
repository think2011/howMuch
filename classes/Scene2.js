class Scene2 {
    constructor() {
        this.$container = document.querySelector('#scene2')
        this.$prices    = this.$container.querySelector('.prices')
        this.price      = 200
        this.count      = 3

        this.init()
    }

    init() {
        setTimeout(() => {
            // toast({content: '🙏 最多只能定3次价格噢, 不然来不及了', time: 4000})
        }, 1000)

        this.$container.classList.add('bounceInUp')
        this.$container.classList.add('animated')
        this.$container.style.display = 'block'

        this.renderPrices(this.price)
        this.$prices.addEventListener('click', (event) => {
            let $target = event.target

            if ($target.tagName !== 'BUTTON') return

            this.judge(+$target.dataset.price, $target)
        })
    }

    restart() {
        this.count = 3
        this.renderPrices(this.price)
    }

    renderPrices(price) {
        let prices = tools.createPrices(price)

        this.$prices.innerHTML = ''
        prices.forEach((item) => {
            let html = `
        <li class="item">
            <button data-price="${item}">${item}</button>
        </li>`

            this.$prices.innerHTML += html
        })
    }

    judge(price, $target) {
        if (this.judgeing) return

        price = +price

        this.judgeing = true
        this.count--

        let resultMap = {
            ok  : ['flip', '😘 看起来很合适, 就定这个价!', 3000],
            high: ['wobble', '😂 太贵了', 3000],
            low : ['wobble', '😓 太便宜了', 3000]
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
            $target.classList.remove(resultMap[result][0])
            toast({content: `${resultMap[result][1]}`, time: resultMap[result][2]})

            this.judgeing = false

            if (this.count < 1) {
                return this.gameOver()
            }
        })
    }

    gameOver() {
        // this.restart()
    }
}