import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validate} from './publish-columns.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

// Append exactly one next topic without changing any saved topic or publication.
export function extendPlan(plan,data,topic,now=new Date()){
  validate(plan,data,now);
  const published=new Set(data.posts.map(post=>post.topicId));
  if(plan.topics.some(item=>!published.has(item.id)))throw new Error('미게시 주제를 먼저 완료해야 합니다.');
  const nextId=Math.max(...plan.topics.map(item=>item.id),...published)+1;
  if(!topic||topic.id!==nextId)throw new Error('다음 고유 순번만 등록할 수 있습니다: '+nextId);
  const textKeys=['slug','category','title','audience','focus','program','primaryKeyword','coverPose','programUrl','searchQuestion'];
  if(textKeys.some(key=>typeof topic[key]!=='string'||!topic[key].trim())||!Array.isArray(topic.deliverables)||topic.deliverables.some(value=>typeof value!=='string'||!value.trim()))throw new Error('새 주제의 필수 정보가 필요합니다.');
  if(plan.topics.some(item=>item.slug===topic.slug||item.title===topic.title||item.coverPose===topic.coverPose)||data.posts.some(post=>post.title===topic.title||post.cover.pose===topic.coverPose))throw new Error('기존 주제의 slug·제목·이미지 동작은 재사용할 수 없습니다.');
  const next={...structuredClone(plan),topics:[...structuredClone(plan.topics),structuredClone(topic)]};
  validate(next,data,now);
  return next;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2),files=args.filter(arg=>!arg.startsWith('--'));
  if(files.length!==1||args.some(arg=>arg.startsWith('--')&&arg!=='--check'))throw new Error('사용법: node scripts/extend-column-plan.mjs <topic.json> [--check]');
  const file=path.join(ROOT,'columns/topics.json'),original=fs.readFileSync(file,'utf8');
  const dataFile=path.join(ROOT,'columns/posts.json'),saved=fs.readFileSync(dataFile,'utf8');
  const next=extendPlan(JSON.parse(original),JSON.parse(saved),JSON.parse(fs.readFileSync(path.resolve(files[0]),'utf8')));
  if(!args.includes('--check')){
    if(fs.readFileSync(file,'utf8')!==original||fs.readFileSync(dataFile,'utf8')!==saved)throw new Error('계획 또는 게시 기록이 변경됐습니다. 최신 상태를 다시 확인하세요.');
    const temp=file+'.'+process.pid+'.tmp';
    fs.writeFileSync(temp,JSON.stringify(next,null,2)+'\n',{flag:'wx'});
    fs.renameSync(temp,file);
  }
  console.log({valid:true,registered:!args.includes('--check'),topicId:next.topics.at(-1).id,totalTopics:next.topics.length});
}
