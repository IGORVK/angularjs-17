//В этом уроке мы разберем что такое transclude: element и как оборачивать директиву в дополнительную разметку.

// создадим форму
 // My form here
  // <form wrap-in='red'>
    // <div>
      // <label>Email:</label>
      // <input type='text' placeholder='Place your email'>
    // </div>
    // <div>
      // <label>Password:</label>
      // <input type='password' placeholder='Enter your password'
    // </div>
    // <button>Submit</button>
  // </form>
  
  //Мы будем добавлять директиву на элемент форм
  // назовем директиву wrap-in и передадим например параметром red
  // Давайте опишем директиву 
  //app.directive('wrapIn', function(){
    // return {
        // link : function (scope, element, attrs){
            // console.log ('wrapIn');
        // }
    // }
// });

// теперь добавим transclude : 'element',
// Псмотрим в браузер... Как мы видим весь контент у нас пропал!!!

// теперь давайте передадим еще два парамета  ctrl, transclude в link function
//  и создадим внут функцию transclude
// transclude(scope, function (clone) {
        // console.log('transclude clone', clone);
//       
      // }); 
      
     // Посмотрим в консоль браузер
     // как мы видим в clone сейчас находится ВЕСЬ наш элемент который мы можем вствавить
     // ТЕПЕРЬ ДАВАЙТЕ СОЗДАДИМ В БОДИ СКРИП
        // <script type="text/ng-template" id='red'>
        // <div class='red'></div>
        // </script>
 // Зачем он нам нужен?
 // мы хотим в директиве из темплейт кэша достать шаблон!
 // Поэтому сейчас мы его опишем
 // заиджектим темплейт кэш в нашу директиву function($templateCache)
 // и в link function в тело добавим
  //var template = $templateCache.get(attrs.wrapIn);
  // т.к. мы инициализированил wrap-in  = 'red' ранее то в темплейт попадет red
 // из $templateCache мы выгребем шаблон с id red
 // посмотрим


//генерируем Dom элемент
 //var templateElement = angular.element(template);
 // теперь наш templateElement является JQlite oбъектом
 // можно посмотреть через console.log('templateElement', templateElement);
 
 // и теперь добавим наш элемент 
 // transclude(scope, function (clone) {
        // element.after(templateElement.append(clone));
      // });
      
       // element.after(templateElement.append(clone));
       // т.е. в начало нашего element - директиву  <form wrap-in='red'> которая по факту сейчас пустая потому что срабатывает трансклуд. В самое начало мы добавляем  <div class='red'></div> templateElement
       // и дальше в него внутрь аппендим clone
       // clone как мы помним это наша форма и мы ее вставляем в <div class='red'></div>
       
       // главное что необходимо запомнить что transclude : element позволяет вствляеть весь элемент-директиву в нашем случае форм а не её содержимое как в случае если бы было transclude : true
     



var app = angular.module('app', []);

app.directive('wrapIn', function ($templateCache) {
  return {
    transclude: 'element',
    link: function (scope, element, attrs, ctrl, transclude) {
      var template = $templateCache.get(attrs.wrapIn);
      console.log(template);
   
      var templateElement = angular.element(template);
console.log('templateElement', templateElement);
      transclude(scope, function (clone) {
        element.after(templateElement.append(clone));
      });
    }
  };
});












