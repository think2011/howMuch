require.config({
    baseUrl: './js',
    paths  : {
        tools    : 'tools/tools',
        toast    : 'tools/toast',
        Fastclick: 'lib/fastclick',

        Scene1: 'app/Scene1',
        Scene2: 'app/Scene2'
    }
})


require(['Scene1', 'Scene2'], function (Scene1, Scene2) {
    new Scene1()
})