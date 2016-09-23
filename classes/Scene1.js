class Scene1 {
    constructor() {
        this.$container     = document.querySelector('#scene1')
        this.$chatContainer = this.$container.querySelector('.chat-container')
        this.$prize         = this.$chatContainer.querySelectorAll('.item')[3]
        this.$sendContainer = this.$container.querySelector('.send-container')
        this.$start         = this.$container.querySelector('.start')

        this.init()
    }

    init() {
        this.$container.style.display = 'block'

        tools.animationEvent(this.$prize, 'AnimationEnd', () => {
            setTimeout(() => {
                this.startTyping()
            }, 300)
        })

        // 开始游戏
        this.$start.addEventListener('click', () => {
            new Scene2()
            this.destroy()
        }, false)
    }

    destroy() {
        this.$container.remove()
    }

    startTyping() {
        const theater = theaterJS({
            "minSpeed": 50,
            "maxSpeed": 150
        })

        theater
            .addActor('typeing')
            .addScene('typeing:😏 什么神秘大奖啊, 赶紧开始吧!', 2500)
            .addScene(theater.replay.bind(theater))

        this.$sendContainer.classList.add('bounceInUp')
        this.$sendContainer.classList.add('active')
    }
}