define(['jquery'], function($) {
    var returnedModule = function() {
        let c = $('cube-canvas');
        let ctx = $(c).getContext('2d');

        const aplha = .7;
        const vertices = [
            {corners: [0,1,3,2], color: `rgba(255, 166, 0, ${alpha})`},
            {corners: [0,1,5,4], color: `rgba(166, 166, 0, ${alpha})`},
            {corners: [1,3,7,5], color: `rgba(12, 166, 50, ${alpha})`},
            {corners: [2,3,7,6], color: `rgba(55, 15, 160, ${alpha})`},
            {corners: [0,2,6,4], color: `rgba(155, 166, 57, ${alpha})`},
            {corners: [4,5,7,6], color: `rgba(0, 166, 200, ${alpha})`}
        ];

        const drawMap = [-255, 255];
        const vertices = [];

        for(i = 0; i < 8; i++) {
            vertices.push({
                x: drawMap[i % 2],
                y: drawMap[Math.floor(i % 4)/2],
                z: drawMap[Math.floor(i /4 )]
            });
        };

        const center = {
            x: c.width / 2;
            y: c.height / 2;
        }

        // Event listener
        let dragAngleXZ, dragAngleYZ;
        let mousedown = false;

        c.addEventListener('mousedown', e => {
            if(mousedown) { return }

            dragAngleXZ = e.mousemoventX / drawMap[1];
            dragAngleYZ = e.mousemoventY / drawMap[1];

            rotate();
            draw();
        });
    }
});