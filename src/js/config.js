require.config({

    // 配置短路径（别名）
    paths:{
        'jquery':'jquery-3.3.1.min',
        'zadzoom':'../lib/jquery-zadzoom/jquery.zadzoom'
    },

    shim:{
        // 配置模块间依赖关系
        // 讲明：lxzoom依赖jquery（加载过程中自动处理先后顺序）
        'zadzoom':['jquery']
    }
});