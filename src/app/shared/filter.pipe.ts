import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[],searchText:string,propertyName:string): any[] {

    const result:any =[];
if(!value || searchText===''||propertyName==='')
{
  return value;
}

value.forEach((a:any)=>{
  if(a[propertyName].trim().toLowerCase().includes(searchText.toLowerCase())){
    result.push(a);
  }
})

    return result;
  }

}
