const particlesOpts = {
    particles: {
        number     : {
            value  : 100,
            density: {
                enable    : true,
                value_area: 800
            }
        },
        line_linked: {
            shadow: {
                enable: true,
                color : "#3CA9D1",
                blur  : 5
            }
        },
        move       : {
            speed: 8
        }
    }
};

module.exports = particlesOpts;
