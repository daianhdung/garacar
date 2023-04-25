package com.backend_spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourcesConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img/**")
                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/img/category/**")
                .addResourceLocations("classpath:/static/category/");
        registry.addResourceHandler("/img/brand/**")
                .addResourceLocations("classpath:/static/brand/");
        registry.addResourceHandler("/img/products/**")
                .addResourceLocations("classpath:/static/products/");
    }
}
