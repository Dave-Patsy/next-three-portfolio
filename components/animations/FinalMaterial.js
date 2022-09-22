import { ShaderMaterial } from "three"
import { extend } from "@react-three/fiber"

class FinalMaterial extends ShaderMaterial {
    constructor(){
        super({
        vertexShader : 
        ` 
            varying vec2 vUv;
            varying vec3 vPosition;
            void main()
            {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                vUv = uv;
                vPosition = position;
            }
        `,
        fragmentShader:
        `
            uniform float time;
            uniform float progress;
            uniform sampler2D scene360;
            uniform sampler2D scenePlanet;
            uniform vec4 resolution;
            varying vec2 vUv;
            varying vec3 vPosition;
            float PI = 3.141592653589793238;

            vec2 distort(vec2 olduv, float pr, float expo){
                vec2 p0 = 2.0*olduv -1.0;
                vec2 p1 = p0/(1.0 - pr*length(p0)*expo);
                return (p1 + 1.0) * 0.5;
            }

            void main(){
                float progress1 = smoothstep(0.75,1.0,progress);
                vec2 uv1 = distort(vUv,-10.0 * pow(0.5 + 0.5*progress,32.0),progress*4.0);
                vec2 uv2 = distort(vUv,-10.0*(1.0-progress),progress*4.0);
                vec4 s360 = texture2D(scene360,uv2);
                vec4 sPlanet = texture2D(scenePlanet,uv1);
                float mixer = progress1;
                vec4 finalTexture = mix(sPlanet, s360, mixer);
                gl_FragColor = finalTexture;
                // gl_FragColor = vec4(1.0,vUv,1.0);
            }
        `,
        uniforms: {
            time: {value: 1},
            progress: {value: 0},
            scene360: {value: null},
            scenePlanet: {value: null}   
        }  
        })
    }
    set time(value) {
        this.uniforms.time.value = value
    }
    get time() {
        return this.uniforms.time.value
    }
    set progress(value) {
        this.uniforms.progress.value = value   
    }
    get progress() {
        return this.uniforms.progress.value
    }
    set scene360(value) {
        this.uniforms.scene360.value = value   
    }
    get scene360() {
        return this.uniforms.scene360.value 
    }
    set scenePlanet(value) {
        this.uniforms.scenePlanet.value = value
    }
    get scenePlanet() {
        return this.uniforms.scenePlanet.value
    }
}

extend({FinalMaterial})