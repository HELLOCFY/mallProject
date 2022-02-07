//引入mockjs模块
import Mock from 'mockjs';
//引入Json
import banner from './banner.json';
import floor from './floor.json';

//mock数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor })