#version 330 core
out vec4 FragColor;

uniform sampler2D texture4;

in vec2 texCoord;

void main()
{
    FragColor = vec4(1.0); // set all 4 vector values to 1.0
}