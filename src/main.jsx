import mount from './mount.jsx'
import App from './App.jsx'

// The 3.5" build used to live on the homepage; old links to it go to /builds.
if (location.hash === '#build') location.replace('/builds#bandit')
else mount(App)
