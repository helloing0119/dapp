# Blocker, React-Electron DApp
## 프로젝트 개요
React-Electron을 이용하여 DApp을 개발하는 프로젝트입니다.
개발자 괴롭히기 : helloing0119@naver.com

## 개발 원칙
다음과 같은 원칙에 따라 개발합니다.

 - 변수나 메소드 이름은 camelCase, 클래스 이름은 CamelCase, 탭은 띄어쓰기 두 칸.
 - 커밋하기 전에 prettify 하기. (VSCode 기준 Shift+Alt+F로 실행)
 - 기능을 구현할 때는 관련있는 기능들을 묶어,  **/src/components/utils/[YOUR_MODULE.js]** 에 새 모듈을 만들어 구현한다.
 
 - 구현한 기능을 앱에 적용시킬 때는 다음 모듈 중 해당하는 모듈의 **handleFUNCTION_YOU_WANT( )** 메소드에 코드를 작성한다.
   * ./src/components/pages/[APP_PAGE.js]
   * ./src/App.js
 
 - Atomic design의 원칙에 따라서...
	 * **Atoms~Molecules**에 해당하는 것은 **Bootstrap Library**로 때운다.
	 * **Organism**에 해당하는 것은 **/src/components/items**에 저장한다.
	 * **Templates**에 해당하는 것은 **/src/components/templates**에 저장한다.
	 * **Pages**에 해당하는 것은 **/src/components/pages**에 저장한다.
![Atomic Design](https://bradfrost.com/wp-content/uploads/2013/06/atomic-design.png)

# 실행 가이드

이 프로젝트는 웹 어플리케이션을 Electon을 이용하여 응용 프로그램으로 변환하는 방식으로 작동합니다. 다음과 같은 개발환경에서 테스트 / 빌드하였습니다.

 - Ubuntu 18.04 LTS
 - npm (8.0.0)

## 1. 공통 사항
### 1-1. npm, git 설치
만약 npm이나 git이 설치되어있지 않다면, **둘 다 설치**해줍니다.
```
    $ sudo apt-get update
    $ sudo apt-get install npm
    $ sudo apt-get install git
```
### 1-2. Git clone
```
    $sudo git clone https://github.com/helloing0119/dapp.git
```
### 1-3. 모듈 설치
package.json에 기입된 모듈을 모두 설치합니다.
```
    $ sudo npm install
```

## 2. React 만을 실행할 때
응용 프로그램으로 배포하는 것은 시간이 걸리므로, 실제 개발 및 테스트 시에는 리액트만 실행하는 것을 권장합니다. 다음과 같이 실행합니다.

### 2-1. React 구동
```
    $ npm run react-start
```
만약 실행이 되지 않는다면, 다음과 같이 합니다.

 1. 3000번 포트를 사용하는 다른 프로세스가 있는지 확인합니다.
 2. sudo로 실행해봅니다.
 3. npm을 업데이트한 뒤, 1-3을 다시 실행합니다.

npm 업데이트는 다음과 같이 할 수 있습니다.
```
    $ npm install -g npm
```

### 2-2. React 접속
설치되어 있는 Chrome이나 Firefox 등의 웹 브라우저를 통해 다음 주소에 접속합니다.
```
    http://127.0.0.1:3000
```
## 3. 응용 프로그램으로 실행할 때
원하는 환경에 맞춰서 앱을 배포합니다. 배포한 앱은 다음 디렉토리에 저장됩니다.
```
	./dist
```
#### 1. mac 32bit
```
	$ npm run build:mac32
```
#### 2. mac 64bit
```
	$ npm run build:mac64
```
#### 3. win 32bit
```
	$ npm run build:win32
```
#### 4. win 64bit
```
	$ npm run build:win64
```
#### 5. 빌드를 하는 컴퓨터의 운영체제 
```
	$ npm run build
```