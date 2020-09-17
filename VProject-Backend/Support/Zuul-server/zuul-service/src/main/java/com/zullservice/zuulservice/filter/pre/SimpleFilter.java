package com.zullservice.zuulservice.filter.pre;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleFilter implements Filter{

  private static Logger log = LoggerFactory.getLogger(SimpleFilter.class);

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
    
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, HEAD, PATCH, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers","*");
    
      if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
          response.setStatus(HttpServletResponse.SC_OK);
      } else {
          chain.doFilter(req, res);
      }

  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    // TODO Auto-generated method stub
    Filter.super.init(filterConfig);
  }


  //   @Override
  //   public String filterType() {
  //       return "post";
  //   }

  //   @Override
  //   public int filterOrder() {
  //     return 1;
  //   }

  //   @Override
  //   public boolean shouldFilter() {
  //     return RequestContext.getCurrentContext().getZuulResponseHeaders().stream()
  //  .anyMatch(ssp -> ssp.first().toLowerCase().equalsIgnoreCase("access-control-allow-origin")) &&
  //   RequestContext.getCurrentContext().getOriginResponseHeaders().stream()
  //  .anyMatch(ssp -> ssp.first().toLowerCase().equalsIgnoreCase("access-control-allow-origin"));
    
  // }

  //   @Override
  //   public Object run() {
  //     RequestContext.getCurrentContext().getZuulResponseHeaders()
  //     .removeIf(ssp -> ssp.first().toLowerCase().startsWith("access-control-allow"));
  //     return null;
  //   }

}