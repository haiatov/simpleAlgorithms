function Search() {}

Search.binary = function(array, find) {
    let start = 0;
    let end = array.length;

    while(start <= end) {
        let middle = Math.round((start + end) / 2);
        let item = array[middle];
        if(item === find) {
            return middle;
        }else if(item < find) {
            start = middle + 1;
        }else if(item > find) {
            end = middle - 1;
        }
    }
    return null;
}

Search.wide = function(graph, property, value){
    let queue = [graph];
    let checked = new Set();
    while(queue.length){
        let item = queue.shift();
        if(!checked.has(item)){
            checked.add(item);
            if(item[property] === value){
                return item;
            }else{
                Array.prototype.push.apply(queue, item.links);
            }
        }
    }
    return null;
}

Search.dijkstra = function(_graph, neededNode){
    let graph = {..._graph};
    let checked = new Set();

    function getAllNodes(node, nodes) {
        if(!nodes) {
            nodes = new Set();
        }
        nodes.add(node);
        if(node.links){
            node.links.forEach(item => {
                getAllNodes(item.node, nodes)
            })
        }
        return nodes;
    }

    let costs = getAllNodes(graph);
    for(let item of costs){
        item.cost = Infinity;
    }

    graph.cost = 0;

    let current = graph;
    while(current) {
        if(current.links){
            current.links.forEach(item => {
                if(!checked.has(item)) {
                    item.node.cost = current.cost + item.weight;
                }
            });
        }
        checked.add(current);
        let minV = Infinity;
        
        costs.forEach(item => {
            if(!checked.has(item) && item.cost < minV){
                minV = item.cost;
                current = item;
            }
        })

        if(minV === Infinity) break;

    }

    return neededNode.cost;
}