function Compile(node,vm){
  if(node){
    this.$frag = this.nodeToFragment(node,vm);
    return this.$frag;
  }
}
Compile.prototype={
  nodeToFragment:function(node,vm){
    var self = this;
    var frag = document.createDocumentFragment();
    var child;
    while(child = node.firstChild){
      self.compileElement(child,vm);
      frag.append(child);
    }
    return frag;
  },
  compileElement:function(node,vm){
    var reg = /\{\{(.*)\}\}/;
    //节点类型为元素
    if(node.nodeType === 1){
      var attr = node.attributes;
      //解析属性
      for(var i=0;i<arr.length;i++){
        if(attr[i].nodeName == 'v-model'){
          var name = attr[i].nodeValue;//获取v-model绑定的属性名
          node.addEventListener('input',function(e){
              //给相应的data属性赋值，进而触发该属性的set方法
              vm[name] = e.target.value;
          })
          new Watcher(vm,node,name,'value')
        }
      }
    }
    //节点类型为text
    if(node.nodeType === 3){
      if(reg.test(node.nodeName)){
        var name = RegExp$1;//获取匹配到的字符串
        name = name.trim();
        new Watcher(vm,node,name,"nodeValue")
      }
    }
  }
}
