class Scene1 {
    constructor() {
        this.$container     = document.querySelector('#scene1')
        this.$nextContainer = document.querySelector('#scene2')
        this.$chatContainer = this.$container.querySelector('.chat-container')
        this.$prize         = this.$chatContainer.querySelectorAll('.item')[3]
        this.$sendContainer = this.$container.querySelector('.send-container')
        this.$start         = this.$container.querySelector('.start')

        this.init()
    }

    init() {
        this.$prize.addEventListener('animationend', () => {
            setTimeout(() => {
                this.startTyping()
            }, 300)
        }, false)

        // 开始游戏
        this.$start.addEventListener('click', () => {
            this.$container.addEventListener('animationend', () => {
                this.$container.remove()
            }, false)

            this.$container.classList.add('bounceOutLeft', 'animated')
            this.$nextContainer.style.display = 'block'
            this.$nextContainer.classList.add('bounceInRight', 'animated')
        }, false)

        this.$container.style.display = 'block'
    }

    startTyping() {
        const theater = theaterJS({
            "minSpeed": 50,
            "maxSpeed": 150
        })

        theater
            .addActor('typeing')
            .addScene('typeing:😏 多大的事啊, 我来帮你吧!', 2500)
            .addScene(theater.replay.bind(theater))

        this.$sendContainer.classList.add('bounceInUp', 'active')
    }
}