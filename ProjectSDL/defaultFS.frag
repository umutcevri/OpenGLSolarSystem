#version 330 core
out vec4 FragColor;

in vec3 Normal;  
in vec3 FragPos; 

in vec2 texCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;

uniform vec3 lightPos; 
uniform vec3 viewPos; 
uniform vec3 lightColor;
uniform vec3 objectColor;
  
void main()
{
     // ambient
    float ambientStrength = 0;
    vec3 ambient = ambientStrength * lightColor;
  	
    // diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    
    // specular
    float specularStrength = 0.5;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    vec3 specular = specularStrength * spec * lightColor;  
    vec4 texColor = texture(texture1, texCoord);

    if(texture(texture3, texCoord).a == 1 && diff <= 0.1)
    {
        texColor = mix(texture(texture1, texCoord), texture(texture3, texCoord), abs(diff - 1));

        if(texture(texture2, texCoord).a >= 0.5)
        {
            texColor = mix(texColor, texture(texture2, texCoord), 1);
        }
        else
        {
            ambient = abs(diff - 1) / 2 * lightColor;
        }
    }   
    else
    {
        texColor = mix(texColor, texture(texture2, texCoord), texture(texture2, texCoord).a);
    }
    

    vec3 result = texColor.rgb * (ambient + diffuse + specular);
    FragColor = vec4(result, 1.0);






    
   
 
}