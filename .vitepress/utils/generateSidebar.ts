import { globSync } from 'glob';
import { basename, dirname, extname, join } from 'path';

interface SidebarItem {
  text: string;
  link: string;
}

interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
  sort: number;
  collapsed?: boolean;
}

const loadConfig = async (configPath: string) => {
  try {
    const config = await import(configPath);
    return config.default;
  } catch (error) {
    console.error(`Failed to load ${configPath}:`, error);
    return null;
  }
}

async function generateSidebar(directory: string) {
  const files = globSync(join(directory, '**/*.md'));
  const sidebarMap: { [key: string]: SidebarGroup } = {};

  for (const file of files) {
    const dir = dirname(file).replace(directory, '');
    const baseDir = dir.split('/')[1] || ''; // 获取一级目录名
    const itemName = basename(file, extname(file));
    const itemLink = join(dir, itemName).replace(/\\/g, '/'); // 替换反斜杠为正斜杠

    const configPath = join(directory, baseDir, 'page.config.js');

    if (!sidebarMap[baseDir]) {
      const config = await loadConfig(configPath);

      sidebarMap[baseDir] = {
        text: config?.meta?.title || baseDir.charAt(0).toUpperCase() + baseDir.slice(1),
        items: [],
        sort: config?.sort || 0,
        collapsed: false,
      };
    }

    sidebarMap[baseDir].items.push({
      text: itemName.charAt(0).toUpperCase() + itemName.slice(1),
      link: `/pages${itemLink}`,
    });
  }

  // 将 sidebarMap 转换为数组
  let sidebar: SidebarGroup[] = Object.values(sidebarMap);

  // 对 sidebar 数组进行排序
  sidebar.sort((a, b) => a.sort - b.sort);

  // console.log('sidebar1', sidebar);

  return sidebar;
}

export default generateSidebar;