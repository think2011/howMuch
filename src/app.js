if (process.env.NODE_ENV !== 'production') {
    require('./index.html')
}

import Scene1 from './classes/Scene1'
import Scene2 from './classes/Scene2'

import './styles/common.scss'

// new Scene1()
new Scene2()
