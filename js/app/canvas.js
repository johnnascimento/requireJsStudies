define(['jquery'], function($) {
    var returnedModule = function() {
        console.log('WORKING');

        let c = document.getElementById('cube-canvas');
        let ctx = c.getContext('2d');

        const aplha = .7;
        const faces = [
            {corners: [0,1,3,2], color: `rgba(255, 166, 0, ${alpha})`},
            {corners: [0,1,5,4], color: `rgba(166, 166, 0, ${alpha})`},
            {corners: [1,3,7,5], color: `rgba(12, 166, 50, ${alpha})`},
            {corners: [2,3,7,6], color: `rgba(55, 15, 160, ${alpha})`},
            {corners: [0,2,6,4], color: `rgba(155, 166, 57, ${alpha})`},
            {corners: [4,5,7,6], color: `rgba(0, 166, 200, ${alpha})`}
        ];

        const drawMap = [-255, 255];
        const vertices = [];

        for(let i = 0; i < 8; i++) {
            vertices.push({
                x: drawMap[i % 2],
                y: drawMap[Math.floor(i % 4)/2],
                z: drawMap[Math.floor(i /4 )]
            });
        };

        console.log('vertices', vertices[1]);
        console.log('vertices', vertices[2]);
        console.log('vertices', vertices[3]);
        console.log('vertices', vertices[4]);
        console.log('vertices', vertices[5]);
        console.log('vertices', vertices[6]);
        console.log('vertices', vertices[7]);
        console.log('vertices', vertices[8]);

        const center = {
            x: c.outerWidth() / 2,
            y: c.outerWidth() / 2
        }

        // Event listener
        let dragAngleXZ, dragAngleYZ,
            mousedown = false;

        c.addEventListener('mousedown', function(e) {
            if(mousedown) { return }

            dragAngleXZ = e.mousemoventX / drawMap[1];
            dragAngleYZ = e.mousemoventY / drawMap[1];

            rotate()
            draw()
        });

        for(let i = 0; i < 8; i++) {
            const vertex = vertices[i];

            const angleXZ = Math.atan2(vertex.x, vertex.z);
            const radiusXZ = distance(vertex.x, vertex.z);
            const newAngleXZ = angleXZ + dragAngleXZ;
            vertex.x = Math.sin(newAngleXZ) * radiusXZ;
            vertex.z = Math.cox(newAngleXZ) * radiusXZ;

            const angleYZ = Math.atan2(vertex.y, vertex.z);
            const radiusYZ = distance(vertex.y, vertex.z);
            const newAngleYZ = angleYZ + dragAngleYZ;
            vertex.y = Math.sin(newAngleYZ) * radiusYZ;
            vertex.z = Math.cos(newAngleYZ) * radiusYZ;
        };

        const rotationLoop = function() {
            rotate()
            draw()

            dragAngleXZ *= rotationDrag;
            dragAngleYZ *= rotationDrag;

            if(mousedown) {
                // This stop the cube if the mouse is down
                dragAngleXZ = 0;
                dragAngleYZ = 0;
            } else {
                setTimeout(rotationLoop, 10);
            }
        };

        ctx.clearRect(0, 0, c.outerWidth(), c.outerHeight());

        let zSums = [];

        for(let  i = 0; i < faces.length; i++) {
            let sum = 0;
            for(let j = 0; j < 4; j++) {
                sum += vertices[faces[i].corners[j]].z;
            }

            zSums[i] = sum;
        };

        const compare = function(a,b) { (zSums[a] - zSums[b]) };
        let facesToDraw = [0,1,2,3,4,5].sort(compare);

        for(let i = 0; i < 6; i++) {
            ctx.beginPath();

            let face = faces[facesToDraw[i]];
            let corners = face.corners;

            for(let j = 0; j < 4; j++) {
                let vertex = vertices[corners[j]];
                let z = 1 + (vertex.z / depth) drawMap[1];
                let x = Math.round(center.x + vertex.x * z);
                let y = Math.round(center.y + vertex.y * z);
                j == 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
            }

            ctx.fillStyle = face.color;
            ctx.fill();
        }
    }

    return returnedModule;
});