class Scene1 {
    constructor() {
        this.$container     = document.querySelector('#scene1')
        this.$chatContainer = this.$container.querySelector('.chat-container')
        this.$prize         = this.$chatContainer.querySelectorAll('.item')[3]
        this.$sendContainer = this.$container.querySelector('.send-container')

        this.$prize.addEventListener('animationend', () => {
            setTimeout(() => {
                this.startTyping()
            }, 300)
        }, false)
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

        this.$sendContainer.classList.add('bounceInUp')
        this.$sendContainer.classList.add('active')
    }
}