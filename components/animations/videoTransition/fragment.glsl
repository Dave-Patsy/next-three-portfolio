varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D t1;
uniform sampler2D t2;
uniform float progress;


void main(){

    vec4 tt1 = texture2D(t1,vUv);
    vec4 tt2 = texture2D(t2,vUv);

    vec4 finalTexture = mix(tt1,tt2,progress);
    // gl_FragColor = vec4(vUv, 0.0,1.0);
    gl_FragColor = vec4(finalTexture);
    if(gl_FragColor.r<0.1 && gl_FragColor.b<0.1 && gl_FragColor.g<0.1) discard;
    
}