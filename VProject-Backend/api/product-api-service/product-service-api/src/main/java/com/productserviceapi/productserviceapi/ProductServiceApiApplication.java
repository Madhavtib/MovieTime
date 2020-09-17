package com.productserviceapi.productserviceapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@EnableDiscoveryClient
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ProductServiceApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductServiceApiApplication.class, args);
	}

	// @Bean
    // public ServletWebServerFactory servletContainer() {
    //     // Enable SSL Trafic
    //     TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
    //         @Override
    //         protected void postProcessContext(Context context) {
    //             SecurityConstraint securityConstraint = new SecurityConstraint();
    //             securityConstraint.setUserConstraint("CONFIDENTIAL");
    //             SecurityCollection collection = new SecurityCollection();
    //             collection.addPattern("/*");
    //             securityConstraint.addCollection(collection);
    //             context.addConstraint(securityConstraint);
    //         }
    //     };

    //     // Add HTTP to HTTPS redirect
    //     tomcat.addAdditionalTomcatConnectors(httpToHttpsRedirectConnector());

    //     return tomcat;
    // }

    // /*
    // We need to redirect from HTTP to HTTPS. Without SSL, this application used
    // port 8082. With SSL it will use port 8443. So, any request for 8082 needs to be
    // redirected to HTTPS on 8443.
    //  */
    // private Connector httpToHttpsRedirectConnector() {
    //     Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
    //     connector.setScheme("http");
    //     connector.setPort(8080);
    //     connector.setSecure(false);
    //     connector.setRedirectPort(8443);
    //     return connector;
    // }
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        ((SimpleClientHttpRequestFactory) restTemplate.getRequestFactory()).setConnectTimeout(15000);
        ((SimpleClientHttpRequestFactory) restTemplate.getRequestFactory()).setReadTimeout(15000);

        return restTemplate;
    }
    @SuppressWarnings("deprecation")
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }
        };
    }
   
}
