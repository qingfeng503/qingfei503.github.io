import { NavigationConfig } from '@/types/navigation'
import { 
  FaHome,
  FaUser,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaRocket,
  FaBook,
  FaLightbulb,
  FaGithub,
  FaTwitter,
  FaRobot,
} from 'react-icons/fa'
import { allPosts } from 'contentlayer/generated'
import { createCategoryRoute } from '@/lib/routes'

// 获取每个分类的文章数量
const getCategoryCount = (category: string) => {
  return allPosts.filter(post => post.category === category).length
}

export const navigation: NavigationConfig = {
  main: [
    { href: '/', label: '首页', icon: FaHome },
    { href: '/about', label: '关于我', icon: FaUser },
  ],
  posts: [
    { href: createCategoryRoute('dev'), label: '编程开发', icon: FaLaptopCode, count: getCategoryCount('dev') },
    { href: createCategoryRoute('ai'), label: '人工智能', icon: FaBrain, count: getCategoryCount('ai') },
    { href: createCategoryRoute('build'), label: '构建之路', icon: FaRocket, count: getCategoryCount('build') },
    { href: createCategoryRoute('reading'), label: '阅读记录', icon: FaBook, count: getCategoryCount('reading') },
    { href: createCategoryRoute('thoughts'), label: '思考随笔', icon: FaLightbulb, count: getCategoryCount('thoughts') },
  ],
  projects: [
    { href: 'https://bestblogs.dev', label: 'BestBlogs.dev', icon: FaCode },
    { href: 'https://bitflowing.net', label: 'BitFlowing',  icon: FaBrain },
    { href: 'https://hiagent.io', label: 'HiAgent', icon: FaRobot },
    { href: 'https://tiky.ai', label: 'Tiky AI', icon: FaRobot },
  ],
  online: [
    { href: 'https://github.com/ginobefun', label: 'GitHub', icon: FaGithub },
    { href: 'https://twitter.com/hongming731', label: 'Twitter', icon: FaTwitter },
  ]
} 