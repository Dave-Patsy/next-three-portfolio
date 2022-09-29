import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";

export default class PictureMaterial extends ShaderMaterial {
    constructor() {
        super({
            vertexShader:
            `
                varying vec2 vUv;
                void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `,
            fragmentShader:
            `
                varying vec2 vUv;
                uniform sampler2D texture1;
                uniform sampler2D texture2;
                uniform sampler2D disp;
                uniform float _rot;
                uniform float dispFactor;
                uniform float effectFactor;

                vec2 rotate(vec2 v, float a){
                    float s = sin(a);
                    float c = cos(a);
                    mat2 m = mat2(c,-s,s,c);
                    return m * v;
                }

                void main() {
                    vec2 uv = vUv;
                    vec4 disp = texture2D(disp, uv);
                    vec2 distortedPosition1 = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
                    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
                    vec4 _texture1 = texture2D(texture1, distortedPosition1);
                    vec4 _texture2 = texture2D(texture2, distortedPosition2);
                    vec4 finalTexture = mix(_texture1, _texture2, dispFactor);
                    gl_FragColor = finalTexture;
                }
            `,
            uniforms:{
                effectFactor: {value:.5},
                dispFactor: {value:.5},
                texture1: {value:null},
                texture2: {value:null},
                disp: {value:null},
            }
        })
    }

    set effectFactor(value) {
        this.uniforms.effectFactor.value = value
    }
    get effectFactor() {
        this.uniforms.effectFactor.value
    }
    set dispFactor(value) {
        this.uniforms.dispFactor.value = value
    }
    get dispFactor() {
        return this.uniforms.dispFactor.value
    }
    set texture1(value) {
        this.uniforms.texture1.value = value
    }
    get texture1() {
        return this.uniforms.texture1.value
    }
    set texture2(value) {
        this.uniforms.texture2.value = value
    }
    get texture2() {
        return this.uniforms.texture2.value
    }
    set disp(value) {
        this.uniforms.disp.value = value
    }
    get disp() {
        return this.uniforms.disp.value
    }
}

extend({PictureMaterial})