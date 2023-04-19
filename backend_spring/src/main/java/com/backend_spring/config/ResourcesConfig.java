package com.backend_spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourcesConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/img/category/**")
//                .addResourceLocations("classpath:/static/image/category/");
//        registry.addResourceHandler("/img/brand/**")
//                .addResourceLocations("classpath:/static/image/brand/");
//        registry.addResourceHandler("/img/products/**")
//                .addResourceLocations("classpath:/static/image/products/");
                registry.addResourceHandler("/img/**")
                .addResourceLocations("classpath:/static/image/category/");
    }
}
