import generateApi from 'swagger-typescript-api'
import path from 'path'
import fs from 'fs'

const apis: any[] = [];
let enumObj: any = {};
generateApi.generateApi({
  name: 'src/apis/swagger/apiModel.d.ts',
  output: path.resolve(process.cwd(), './'),
  url: 'http://120.24.57.120:8088/v3/api-docs',
  // url: 'http://192.168.50.38:8080/v3/api-docs',
  generateClient: false,
  hooks: {
    onFormatRouteName: (routeInfo) => {
      const route = routeInfo.route;
      if (route && route.startsWith('/pinvo/api/v1')) {
        const apiUrl = route.replace('/pinvo/api/v1', '');
        // @ts-ignore
        const requestName = routeInfo.requestBody?.content?.['application/json'].schema?.['$ref']?.replace('#/components/schemas/', '');
        const responseName = routeInfo.responsesTypes[0].type;
        const list = apiUrl.split('/');
        const name = list.reduce((pre, curr) => {
          if (curr) {
            pre = pre + curr[0].toUpperCase() + curr.substring(1);
          }
          return pre;
        }, '');

        apis.push({ name, url: apiUrl, desc: routeInfo.description, requestName, responseName });
      }
      // routeInfo.route
      // console.log(routeInfo.requestBody?.content?.['application/json']);
    },
    onCreateComponent: (component) =>{
      // 所有 enum 类型
      if(component.typeName === 'AllEnumsInfo') {
        const props = component.rawTypeData?.properties
        enumObj = props
        
      }
    }
  },
}).then(() => {
  let content = apis.reduce((pre, curr) => {
    if (curr) {
      pre = pre + '\n' + `  /**\n  ${curr.desc}\n  @request: ${curr.requestName}\n  @response: ${curr.responseName}\n  */\n  ${curr.name} = '${curr.url}',\n`;
    }
    return pre;
  }, '');

  content = `export enum ApiEnum {${content}}\n`;
  fs.writeFileSync('src/apis/swagger/apiEnum.ts', content, { encoding: 'utf-8' });

  if(enumObj) {
    const enumContent = Object.keys(enumObj).reduce((pre, curr) => {
      const currEnum = enumObj[curr]
      pre = pre + `/**\n  ${currEnum.description}\n  */\nexport enum ${currEnum.example} {\n`
      currEnum.enum.forEach((k: string) => {
        pre += `  ${k} = '${k}',\n`
      })
      pre += '}\n'

      return pre;
    }, '')

    fs.writeFileSync('src/enums/swagger.ts', enumContent, { encoding: 'utf-8' });
  }


  // console.log(apis);
});
