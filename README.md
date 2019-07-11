# Hexagonal spring boot application generator

## What is hexagonal architecture?
Hexagonal architecture is a way of designing your code structure where inputs and outputs of the application are kept 
at the edges of your design.

In doing so, you isolate the central logic (the core) of your application from outside concerns. 
Having inputs and outputs at the edge means you can swap out their handlers without changing the core code.

## Why use this generator?
Currently there are situations where you want to give your app a flexible and smart structure like Hexagonal but you don't know
where to start!!

One can use this generator to scaffold a new app which is totally based on Spring boot and hexagonal architecture.

## Getting started 
If you want to generate your own spring boot application which works on hexagonal design pattern, then you can use this generator. Simply follow below steps:
- Make sure you have npm and node.js installed.
- in command prompt (shell prompt) go to the directory where you want to generate the application.
- Run `npm install -g yo` command to download yeoman scaffolding tool.
- Run `npm install -g generator-hexagonal-api` command to download hexagonal spring boot app generator.
- Once installation is complete use yeoman tool to scaffold your app using using generator-hexagonal-api, just run `yo hexagonal-api`
- you application will be generated in no time.
