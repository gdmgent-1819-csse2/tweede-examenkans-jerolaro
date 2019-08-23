import Canvas from './Library/Canvas.js'
import Tests from './Tests/Tests.js'

/** Class for the application. */
export default class Application {
    /**
     * Create a new application.
     */
    constructor() {
        const tests = true
        if (tests) {
            new Tests()
        }

        this.shaderSources = {
            fragment: null,
            vertex: null,
        }
        this.preloader()
    }

    /** load glsl shaders     */
    async preloader() {
        console.info('Preloading source code for shaders')
        await fetch('./assets/glsl/vertex-shader.glsl')
            .then(response => response.text())
            .then(source => this.shaderSources.vertex = source)
            .catch(error => console.error(error.message))
        await fetch('./assets/glsl/fragment-shader.glsl')
            .then(response => response.text())
            .then(source => this.shaderSources.fragment = source)
            .catch(error => console.error(error.message))
        this.run()
    }

    /** Draw Canvas     */
    run() {
        const width = 500
        const height = 500

        // VECTOR
        let ranges = [document.getElementById('vector1X'), document.getElementById('vector1Y'), document.getElementById('vector2X'), document.getElementById('vector2Y'), document.getElementById('scalar')]
        let canvas = new Canvas(width, height, this.shaderSources, ranges, "divVectorCanvas")

        let e = document.getElementById('selectOperationVect')
        e.onchange = function() {
            document.getElementById('OperationTitle').innerHTML = e.options[e.selectedIndex].text
            canvas.operation = canvas.operations[e.options[e.selectedIndex].value]

            if(e.options[e.selectedIndex].value == 1){
                document.getElementById('vector2').style.display = 'none'
            } else{
                document.getElementById('vector2').style.display = 'block'

            }
            

        }

        // MATRIX
        let ranges2 = [document.getElementById('scale_x'), document.getElementById('scale_y'), document.getElementById('rot_omega')]
        let canvas2 = new Canvas(width, height, this.shaderSources, ranges2, "divMatrixCanvas")

        let e2 = document.getElementById('selectOperationMtx')
        e2.onchange = function() {
            document.getElementById('txtOperationMtx').innerHTML = e2.options[e2.selectedIndex].text
            canvas2.operation = canvas.operations[e2.options[e2.selectedIndex].value]
        
            if(e2.options[e2.selectedIndex].value == 3){
                document.getElementById('rotate').style.display = 'none'
                document.getElementById('scale').style.display = 'block'
            } else{
                document.getElementById('rotate').style.display = 'block'
                document.getElementById('scale').style.display = 'none'
            }
        }
        window.dispatchEvent(new Event('updateCanvas'))

        // Write inputValue in p-element
        document.getElementById("vector1X").oninput = function() {
            document.getElementById("vector1XStart").innerHTML = document.getElementById("vector1X").value
        }
        document.getElementById("vector1Y").oninput = function() {
            document.getElementById("vector1YStart").innerHTML = document.getElementById("vector1Y").value
        }
        document.getElementById("vector2X").oninput = function() {
            document.getElementById("vector2XStart").innerHTML = document.getElementById("vector2X").value
        }
        document.getElementById("vector2Y").oninput = function() {
            document.getElementById("vector2YStart").innerHTML = document.getElementById("vector2Y").value
        }
        document.getElementById("scalar").oninput = function() {
            document.getElementById("scailerValue").innerHTML = document.getElementById("scalar").value
        }
        document.getElementById("rot_omega").oninput = function() {
            document.getElementById("rotValue").innerHTML = document.getElementById("rot_omega").value + "°"
        }
        document.getElementById("scale_x").oninput = function() {
            document.getElementById("scale_xValue").innerHTML = document.getElementById("scale_x").value
        }
        document.getElementById("scale_y").oninput = function() {
            document.getElementById("scale_yValue").innerHTML = document.getElementById("scale_y").value
        }
    }
}