# grav-theme-boilerplate
A starter for GravCMS easy theme development evn setup: gulp + less

## How to use
**Step 1:** Create a new theme for Grav via GPM following official docs: https://learn.getgrav.org/16/themes/theme-tutorial

**Step 2:** Clone this repo & copy all stuff to your new theme root

## Workflow
All changes you make should take place at '\_dev' folder. 

### Development

While in dev use

    gulp watch

to start watcher, or

    gulp build --dev
    
to buld theme files with non-minified CSS and with sourcemaps

### Production

For production with minified CSS & no comments, sourcemaps etc. use

    gulp build --prod
  
