1. 
思路:
矩阵是有序的 从左下角来看 向上数字递增 向右数字递减
因此从左下角开始查找 当要查找数字比左下角数字大时 右移
要查找数字比左下角小时 上移

var arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
function find(arr, target) {
    if(arr.length === 0 && arr[0].length === 0) {
        return false;
    }
    var row = arr[0].length - 1;
        col = 0,
    console.log(arr[row][col]);
    while(col < arr.length && row > -1) {
        if(arr[row][col] === target) {
            return true;
        }else if(arr[row][col] < target) {
            col ++;
        }else {
            row --;
        }
    }   
}




2. 
var str = 'We Are Happy';
function replaceSpace(str) {    
    var reg = /\s/g;
    return str.replace(reg, '%20');
}    




3. 
/*  function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head) {
    var res = [], 
        pNode = head;
    while(!pNode) {
        arr.unshift(pNode.val);
        pNode = pNode.next;
    }      
}




4. 
思路: 
本题主要考察了二叉树的遍历，先复习下

前序遍历（VLR）： 
    1.访问根节点 
    2.前序遍历左子树 
    3.前序遍历右子树 
中序遍历（LVR）： 
    1.中序遍历左子树 
    2.访问根节点 
    3.中序遍历右子树 
后序遍历（LRV）： 
    1.后序遍历左子树 
    2.后序遍历右子树 
    3.访问根节点

总之，做这种有关树、链表的题一定要有递归的思想，总之该题的解题思路就是四步，具体思路可以参考这里
    1. 确定根,确定左子树，确定右子树。
    2. 在左子树中递归。
    3. 在右子树中递归。
    4. 打印当前根。

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
 } */
function reConstructBinaryTree(pre, vin) {

    if (pre.length === 0 || vin.length === 0) {
        return null;
    }
    // 前序第一个是根节点，也是中序左右子树的分割点
    const index = vin.indexOf(pre[0]),
           left = vin.slice(0, index),
           right = vin.slice(index + 1);
    return {
        val: pre[0],
        // 递归左右子树的前序、中序
        left: reConstructBinaryTree(pre.slice(1, index + 1), left),
        right: reConstructBinaryTree(pre.slice(index + 1), right)
    };
}

详解: http://www.cnblogs.com/fzhe/archive/2013/01/07/2849040.html




5. 
思路:
用栈模拟队列 因为队列是先进先出的 栈先进后出 所有需要两个栈 一个在进队时存储元素 一个在出队时把顺序翻转一下 用于出队的栈可能为空 为空就检测下用于入队的栈是不是空 后者不为空就可以把元素翻转存起来 


模拟栈 push pop
模拟队列 unshift shift

var outStack = [];
var inStack = [];
function push(node) {
    inStack.push(node);
}
function pop() {
    if(!outStack.length) {
        while(inStack.length) {
            outStack.push(inStack.pop());
        }
    }
    return outStack.pop();
}




6. 
这是一道二分查找的变形的题目
旋转之后的数组实际上可以划分成两个有序的子数组: 前面子数组的大小都大于后面子数组中的元素
注意到实际上最小的元素就是两个子数组的分界线 本题目给出的数组一定程度上是排序的 因此我们试着用二分查找寻找这个最小的元素
思路: 
我们用两个指针left right分别指向数组的第一个元素和最后一个元素 
找到数组的中间元素
中间元素大于最后一个元素 则中间元素位于前面的递增子数组 此时最小元素位于中间元素的的后面 我们可以让第一个指针left指向中间元素
移动之后 第一个指针依然位于前面的递增数组中
中间元素小于最后一个元素 则中间元素位于后面的递增子数组 此时最小元素位于中间元素的前面 我们可以让第二个指针right指向中间元素
移动之后 第二个指针依然位于后面的递增数组中
这样可以缩小寻找范围

var arr = [4, 5, 1, 2, 3];
function minNumberInRotateArray(rotateArray) {  
    if(rotateArray === null || rotateArray.length === 0) {
        return 0;
    }
    var left = 0,
        right = rotateArray.length - 1;
    var mid = (left + right) / 2;
    while (right > left) {
        if (rotateArray[mid] > rotateArray[right]) {
            left = mid;
        } else  if(rotateArray[mid] < rotateArray[right]){
            right = mid;
        }else {
            return rotateArray[right];
        }
        mid = (left + right) / 2;
    }
    return rotateArray[right];
}
??????????????不通过




7. 
思路： 
用循环 最好不好用递归

用递归对于程序来说每次递归都是未知的 以一定的空间代价来避免由重复计算造成的栈空间浪费

function Fibonacci(n)
{
    var arr = [];
    arr[0] = 0;
    arr[1] = 1;
    for(i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
}

详解: https://www.cnblogs.com/echovic/p/6430646.html




8. 
思路:
a. 如果有两种跳法 1阶或者2阶 那么假定第一次跳的是一阶 那么剩下的是n-1个台阶 跳法是f(n-1);
b. 假定第一次跳的是2阶 那么剩下的是n-2个台阶 跳法是f(n-2)
c. 由a\b假设可以得出总跳法为: f(n) = f(n-1) + f(n-2)
d. 然后通过实际的情况可以得出: 只有一阶的时候f(1)=1 只有两阶的时候可以有f(2)=2
e. 可以发现最终得出的是一个斐波那契列

function jumpFloor(number) {        
    if(number === 1) {
        return 1;
    } else if(number === 2) {
        return 2;
    }else {
        return jumpFloor(number - 1) + jumpFloor(number - 2);
    }    
}




9. 
思路: 
前提是n个台阶有一次n阶的跳法
f(1) = 1
f(2) = f(2-1) + f(2-2)
f(n-1) = f((n-1)-1) + f((n-1)-2) + ... f((n-1)-(n-2)) + f((n-1)-(n-1)) 
       = f(0) + f(1) + ... f(n-3) + f(n-2)
f(n) = f(n-1) + f(n-2) + ... f(n-(n-1)) + f(n-n)
     = f(0) + f(1) + ... + f(n-2) + f(n-1)
     = f(n-1) + f(n-1)
     f(n-1) * 2      

function jumpFloorII(number) {
    if(number === 1) {
        return 1;
    }else if(number === 2) {
        return 2;
    }else {
        return 2 * jumpFloorII(number - 1)
    }
}




10. 
思路: 
依旧是斐波那契数列
2*n的大矩形，和n个2*1的小矩形
其中target*2为大矩阵的大小
有以下几种情形：
1⃣️target <= 0 大矩形为<= 2*0,直接return 1；
2⃣️target = 1大矩形为2*1，只有一种摆放方法，return1；
3⃣️target = 2 大矩形为2*2，有两种摆放方法，return2；
4⃣️target = n 分为两步考虑：
    第一次摆放一块 2*1 的小矩阵，则摆放方法总共为f(target - 1)
    第一次摆放一块1*2的小矩阵，则摆放方法总共为f(target-2) 因为，摆放了一块1*2的小矩阵（用√√表示），对应下方的1*2（用××表示）摆放方法就确定了，所以为f(targte-2)

function rectCover(number)
{
    var result = [0, 1, 2];
    for(var i = 3; i <= number; i++) {
        result[i] = result[i - 1] + result[i - 2];
    }
    return result[number];
}




11. ??????????????




12. 
思路??????  这种效率比较低
function Power(base, exponent)
{
    var sum = 1;
    if(exponent > 0) {
        for(var i = 0; i < exponent; i++) {
            sum *= base; 
        }
    }else{
        for(var i = 0; i > exponent; i--) {
            sum *= 1 / base;
        }
    }
    return sum;
}




13. 
思路:
判断是否为奇数，统计奇数个数，然后新建数组，把所有奇数存进去数组前面，剩下的存进去数组后面。

function reOrderArray(array) {
    // oddBegin主要是用作奇数的索引，oddCount是用作偶数的索引,newArray用来存储，以空间换时间，复杂度为O(n)
    let oddBegin = 0,
        oddCount = 0;
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] & 1) {
            oddCount++;
        }
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i] & 1) {
            newArray[oddBegin++] = array[i];
        } else {
            newArray[oddCount++] = array[i];
        }
    }
    return newArray;
}




14.
思路:  
用两个指针来跑，两个指针中间相距k-1个节点,第一个指针先跑，跑到了第k个节点时，第二个指针则是第一个节点。
这时候两个一起跑。当第一个跑到了最后一个节点时，这时候第一个指针则是倒数第k个节

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    if(head === null || k <= 0) { // 注意这块的判断
        return null;
    }
    var pPre = head,
        pNext = head;
    while(--k) {
        if(pNext.next) { // 注意这块的判断
            pNext = pNext.next;
        }else {
            return null;
        }
    }
    while(pNext.next) {
        pNext = pNext.next;
        pPre = pPre.next;
    }
    return pPre;
}




15. 
思路: 
至少需要三个指针pPre（指向前一个结点）、pCurrent（指向当前的结点，在代码中就是pHead）、pPnext（指向后一个结点）。

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    var pPre = null,
        pNext = null;
    while(pHead) {
        // 存储pNext
        pNext = pHead.next;
        // 改变指针
        pHead.next = pPre;
        // 位置移动
        pPre = pHead;
        pHead = pNext;
    }
    return pPre;
}




16. 
思路: 
重点抓住这两个链表都是单挑递增的，因此我们只需要不断地比较他们的头结点就行，明显这是个重复的过程。
可以用递归做，也可以不用递归做，不用递归做只需要用两个指针来一直指向两个链表的“头”结点就行了

// 递归版本
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    // 表头为空
    if(pHead1 === null) {
        return pHead2;
    }
    if(pHead2 === null) {
        return pHead1;
    }
    
    // 递归
    var pMergeHead = null;
    if(pHead1.val > pHead2.val) {
        pMergeHead = pHead2;
        pMergeHead.next = Merge(pHead1, pHead2.next);
    }else {
        pMergeHead = pHead1;
        pMergeHead.next = Merge(pHead1.next, pHead2);
    }
    return pMergeHead;
}

// 非递归版本
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    // 判断是否为空
    if(pHead1 === null) {
        return pHead2;
    }
    if(pHead2 === null) {
        return pHead1;
    }

    var pHead = {val: 0, next: null}, // 存储头部链表
        pNext = pHead; // 索引 会移动的
    
    while(pHead1 && pHead2) {
        if(pHead1.val > pHead2.val) {
            pNext.next = pHead2;
            pHead2 = pHead2.next;
        }else {
            pNext.next = pHead1;
            pHead1 = pHead1.next;
        }
        pNext = pNext.next;
    }
    
    if(pHead1 === null) {
        pNext.next = pHead2;
    }
    if(pHead2 === null) {
        pNext.next = pHead1;
    }
    
    return pHead.next;
}




17. 
思路: 
分析如何判断树B是不是树A的子结构，只需要两步。很容易看出来这是一个递归的过程。一般在树的求解方面都和递归有关。
Step1.在树A中找到和B的根结点的值一样的结点R；
Step2.判断树A中以R为根结点的子树是不是包含和树B一样的结点。

function HasSubtree(pRoot1, pRoot2) {
    let res = false;
    // 当Tree1和Tree2都不为零的时候，才进行比较。否则直接返回false
    if (pRoot1 === null || pRoot2 === null) return false;
    if (pRoot1.val === pRoot2.val) { 
        // 以这个根节点为为起点判断是否包含Tree2
        res = doesTree1HasTree2(pRoot1, pRoot2);
    }
    // 如果找不到，那么就再去root的左儿子当作起点，去判断时候包含Tree2
    if (!res) res = HasSubtree(pRoot1.left, pRoot2);
    // 如果还找不到，那么就再去root的右儿子当作起点，去判断时候包含Tree2
    if (!res) res = HasSubtree(pRoot1.right, pRoot2);
    // 返回结果
    return res;
}
function doesTree1HasTree2(pRoot1, pRoot2) {
    // 如果Tree2已经遍历完了都能对应的上，返回true
    if (pRoot2 === null) return true;
    // 如果Tree2还没有遍历完，Tree1却遍历完了。返回false
    if (pRoot1 === null) return false;
    // 如果其中有一个点没有对应上，返回false
    if (pRoot1.val !== pRoot2.val) return false;
    // 如果根节点对应的上，那么就分别去子节点里面匹配
    return doesTree1HasTree2(pRoot1.left, pRoot2.left) && doesTree1HasTree2(pRoot1.right, pRoot2.right);
}




18. 
思路: 
很简单，交换左右节点，递归

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root)
{
    if(root === null) {
        return;
    }
    // 左右节点交换值
    [root.left, root.right] = [root.right, root.left];
    // 递归
    Mirror(root.left);
    Mirror(root.right);
    return root;
}




19. 
思路: 
首先我们需要把这个复杂的问题分解为简单的问题，打印矩阵也就是一圈一圈的打印出来，所以我们需要解决的问题就是：
1.什么时候该继续打印下一圈即里面那一圈，也就是要找到循环的条件。
2.一圈该如何打印。

那么什么是循环结束的条件呢？也就是我们需要思考从第一圈到第二圈的条件是什么或者说他们有什么共同的特征。我们注意4X4的矩阵，只有两圈，到从第一圈到第二圈，起点从（0,0）变为了（1,1），我们发现4>1*2,类似的对于一个5X5的矩阵而言，最后一圈只有一个数字，起点坐标为（2,2），满足5>2*2,同理对于6X6的矩阵也是类似。故可以得出循环的条件就是columns>startX*2并且rows>startY*2。

然后我们就要实现打印一圈，再分解也就是从左到右，从上到下，从右到左，从下到上。不过要注意下边界条件，也就是最后一圈构成不了一个完整的圈的一些条件，找到了就很好写出代码了。

除此此外，还有一种思路比较巧妙的解法：模拟魔方逆时针解法。
例如 
1 2 3
4 5 6
7 8 9
输出并删除第一行后，再进行一次逆时针旋转，就变成：
6 9
5 8
4 7
继续重复上述操作即可
 
function printMatrix(matrix) {
			
    var row = matrix.length,
        col = matrix[0].length;
    
    var res = [];	
    
    // 假如单列或者单行
    if(col === 1 || row === 1) {
        return matrix;
    }

    var left = 0,
        right = col - 1,
        top = 0,
        bottom = row - 1;
    
    while(left <= right && top <= bottom) {

        // to right
        for(var i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        }
        
        // to bottom
        for(var i = top + 1; i <= bottom; i++) {
            res.push(matrix[i][right]);
        }
        
        // to left
        // 判断是否会重复打印(从右向左的每行数据)
        if(top !== bottom)
        for(var i = right - 1; i >= left; i--) {
            res.push(matrix[bottom][i]);
        }
        
        // to top
        // 判断是否会重复打印(从下往上的每一列数据)
        if(left !== right)
        for(var i = bottom - 1; i >= top + 1; i--) {
            res.push(matrix[i][left]);
        }
        
        // 循环完一圈要做的事情
        left ++;
        right --;
        top ++;
        bottom --;
    }
    return res;
}


魔方解法??????????????????




20. 
思路：利用一个辅助栈来存放最小值

    栈      3，4，2，5，1
    辅助栈  3，3，2，2，1
每入栈一次，就与辅助栈顶比较大小，如果小就入栈，如果大就入栈当前的辅助栈顶
当出栈时，辅助栈也要出栈
这种做法可以保证辅助栈顶一定都当前栈的最小值

var stack = [],
    minStack = [];
var temp = null;
function push(node)
{
    if(temp !== null) { 
        if(node < temp) {
            temp = node;
        }
        stack.push(node);
        minStack.push(temp);
    }else {
        temp = node;
        stack.push(node);
        minStack.push(node);
    }
}
function pop()
{
    stack.pop();
    minStack.pop();
}
function top() {
    return stack[stack.length - 1];
}
function min()
{
    return minStack[minStack.length - 1];
}




21. ？？？？？？？？？？？？？？？？？？？？？？？？？？




22. 
思路:
从下打印就是按层次打印，其实也就是树的广度遍历。
一般来说树的广度遍历用队列，利用先进先出的特点来保存之前节点，并操作之前的节点。
树的深度遍历一般来说用栈或者递归，利用先进后出的特点来保存之前节点，把之前的节点留到后面操作。

// 非递归方式
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root)
{
    var res = [],
        queue = [];
    
    // 节点为空 直接返回
    if(!root) {
        return res;
    }
    
    queue.push(root);
    
    // 循环
    while(queue.length) {
        var pRoot = queue.shift();
        if(pRoot.left) {
            queue.push(pRoot.left);
        }
        if(pRoot.right) {
            queue.push(pRoot.right);
        }
        res.push(pRoot.val);
    }
    
    return res;
}

// 此外，我们可以用递归来自己创建完全二叉树来做测试。???????????????




23. 
思路:
    已知条件：后序序列最后一个值为root；二叉搜索树左子树值都比root小，右子树值都比root大。
    1、确定root；
    2、遍历序列（除去root结点），找到第一个大于root的位置，则该位置左边为左子树，右边为右子树；
    3、遍历右子树，若发现有小于root的值，则直接返回false；
       或者遍历左子树，若发现有大于root的值，则直接返回false；
    4、分别判断左子树和右子树是否仍是二叉搜索树（即递归步骤1、2、3）。

// 递归版
function VerifySquenceOfBST(sequence)
{
    // 数组为空
    if(!sequence.length) {
        return false;
    }
    // 判断是否为二叉树
    return judge(sequence, 0, sequence.length - 1);
}

function judge(sequence, left, right) {
    if(left >= right) {
        return true;
    }
    // 找出第一个比root大的节点 左子树和右子树的分界点 左边为左子树 右边为右子树
    var middle = right; 
    while(sequence[middle - 1] > sequence[right] && middle > left) {
        middle --;
    }
    
    // 遍历左子树 看看每个节点是否比root小
    for(var i = 0; i < middle; i++) {
        if(sequence[i] > sequence[right]) {
            return false;
        }
    }
    // 遍历右子树 看看每个节点是否比root大   ???? 只通过百分之62.5？？？    
    // for(var i = middle; i < right; i++) {
    //     if(sequence[i] < sequence[right]) {
    //         return false;
    //     }
    // }
    
    return judge(sequence, left, middle - 1) && judge(sequence, middle, right - 1);
}

// 非递归版
?????????????????????????????




24. ??????????????????????????????????????????????




25. 
思路:
这道题有三种解法。
解法一
就是普通的解法，先复制节点，用p.next连接起来。然后再去设置p.random指针指向，不过这个设置又需要从头节点开始查。
所以总的时间复杂度为O（n2）
解法二
用map来保存<N，N`>，这样就很容易设置p.random了，比如我们在节点S处和节点S`处，我们通过S可以得到N，那么<N，N`>对应，
我们就可以就可以使得S`的next指向N`了。这是通过空间换时间
解法三
第三种就是比较复杂些，但是不用空间换时间也能达到O（n）
第一步，对链表的每个节点N创建N‘，并链接在N的后面。
设置复制出来的p.random。节点N指向S，那么N'指向S'，而N和N'相邻，那么S和S'也相邻。
把长链表拆开成两个链表。

// 递归
function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}
function Clone(pHead)
{
    if(!pHead) {
        return null;
    }
    // 深度拷贝当前的值
    var pNewHead = new RandomListNode(pHead.label);
    // 浅度拷贝random的值
    pNewHead.random = pHead.random;
    // 深度拷贝下一个的值
    pNewHead.next = Clone(pHead.next);
    return pNewHead;
}

// 非递归
????????




二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。




26. 
思路:
1.核心是中序遍历的非递归算法。
2.修改当前遍历节点与前一遍历节点的指针指向。

// 非递归版本
function Convert(pRootOfTree)
{
    // 当前节点
    var pNode = pRootOfTree;
    
    // 前一个节点
    var pre = null; 
    
    // 利用栈来存储值 后进先出的特点
    var stack = [];
    
    // 设置一个锁来判断是否是头节点
    var isFirst = true;
    
    while(pNode !== null ||  stack.length > 0) {
        
        // 找到左边的节点全部放到栈里面
        while(pNode) {
            stack.push(pNode);
            pNode = pNode.left;
        }
        
        // 截取栈最后一个节点作为当前节点
        pNode = stack.pop();
        
        if(isFirst) {
            // 存储头节点
            var pRoot = pNode;
            pre = pNode;
            isFirst = false;
        }else {
            // 改变前一个节点和当前节点的指针
            pre.right = pNode;
            pNode.left = pre;
            // 把当前值赋值给前一个值
            pre = pNode;
        }
        // 看看当前值有没有右节点
        pNode = pNode.right;
    }
    
    return pRoot;   
}

// 递归版本




27. 
思路:
这题还算可以，关于全排列，有两种解法，第一种就是递归全排列法，第二种就是回溯法。

递归全排列法：
就是剑指offer上的做法，也比较容易理解，不过挺少人答的也就是
把字符串分为两部分：第一部分为第一个字符，第二部分为第一个字符以后的字符串。
然后接下来求后面那部分的全排列。
再将第一个字符与后面的那部分字符逐个交换

回溯法
也就是利用树去尝试不同的可能性，不断地去字符串数组里面拿一个字符出来拼接字符串，当字符串数组被拿空时，就把结果添加进结果数组里，然后回溯上一层。（通过往数组加回去字符以及拼接的字符串减少一个来回溯。）

// 递归版本
function Permutation(str)
{
    if(str.length <= 0) {
        return [];
    }
    var arr = str.split('');
    var res = [];
    var index = 0;
    
    // 排列字母位置
    res = Permutate(arr, index, res);
    
    // 去重  arr.sort()方法默认按字母排序
    return [...new Set(res)].sort();
}

function Permutate(arr, index, res) {
    
    if(index === arr.length) {
        var str = '';
        for(var i = 0; i < arr.length; i++) {
            str += arr[i];
        }
        return res.push(str);
    }
        
    for(var i = index; i < arr.length; i++) {
        // 位置交换
        [arr[index], arr[i]] = [arr[i], arr[index]];
        
        // 递归移动位置
        Permutate(arr, index + 1, res);
        
        // 恢复原来的位置
        [arr[index], arr[i]] = [arr[i], arr[index]]
    }
        
    return res;
}

// ['a', 'b', 'c']
//
//  第一轮 index = 0
//  arr = ['a', 'b', 'c'] 00 
//        ['b', 'a', 'c'] 01
//        ['c', 'b', 'a'] 02
//
//  第二轮 index = 1    
//        ['a', 'b', 'c'] 11   ['a', 'c', 'b'] 12
//        ['b', 'a', 'c'] 11   ['b', 'c', 'a'] 12
//        ['c', 'b', 'a'] 11   ['c', 'a', 'b'] 12
//
// 第三轮 index = 2
//        ['a', 'b', 'c'] 22   ['a', 'c', 'b'] 22
//        ['b', 'a', 'c'] 22   ['b', 'c', 'a'] 22
//        ['c', 'b', 'a'] 22   ['c', 'a', 'b'] 22
//
// 第四轮 index = 3
// 全部放进res res = ["abc", "acb", "bac", "bca", "cab", "cba"]


// 非递归版本??




28. 
思路: 
如果有符合条件的数字，则它出现的次数比其他所有数字出现的次数和还要多。在遍历数组时保存两个值：一是数组中一个数字，一是次数。遍历下一个数字时，若它与之前保存的数字相同，则次数加1，否则次数减1；若次数为0，则保存下一个数字，并将次数置为1。遍历结束后，所保存的数字即为所求。然后再判断它是否符合条件即可。

function MoreThanHalfNum_Solution(numbers)
{
    var num = numbers[0], 
        count = 1;
    var len = numbers.length;
    
    // 假如满足条件的话 它的次数一定大于其他出现的次数的总和 所以count会大于1
    for(var i = 1; i < len; i++) {
        if(numbers[i] === num) {
            count ++;
        }else {
            count --;
        }
        if(count === 0) {
            num = numbers[i];
            count = 1;
        }
    }
    
    // 次数置零
    count = 0;
    
    // 计算它出现的次数
    for(var i = 0; i < len; i++) {
        if(num === numbers[i]) {
            count ++;
        }
    }
    
    if(count * 2 > len) {
        return num;
    }else {
        return 0;
    }   
}


思路: 
利用对象的属性唯一的特性

function MoreThanHalfNum_Solution(numbers)
{
    var obj = {};
    var len = numbers.length;
    var res = [];
    
    for(var i = 0; i < len; i++) {
      if(!obj[numbers[i]]) {
        obj[numbers[i]] = 1;
      }else {
        obj[numbers[i]]++;
      }
    }
    
    for(var prop in obj) {
      if( obj[prop] > (len / 2) ) {
        res.push(prop);
      }
    }
    
    if(res.length > 0) {
        return res
    }else {
        return 0;
    }
}




29. 

function GetLeastNumbers_Solution(input, k)
{
    if(k > input.length) {
        return [];
    }
    
    // 从小到大排序
    var arr = input.sort(function(a, b) {
        return a - b;
    })

    // 截取前k位
    return arr.slice(0, k);
}

？？？？？？？？？？？？？？？？？？？

九大排序方法
???????????????

30. 
// 动态规划
使用动态规划
F(i): 以array[i]为末尾元素的子数组的和的最大值，子数组的元素的相对位置不变
F(i)= max(F(i-1)+array[i], array[i])
res: 所有子数组的和的最大值
res=max(res，F(i)

如数组 [6, -3, -2, 7, -15, 1, 2, 2]
初始状态: 
    F(0)=6
    res=6
i=1: 
    F(1)=max(F(0)-3，-3)=max(6-3，3)=3
    res=max(F(1)，res)=max(3，6)=6
i=2: 
    F(2)=max(F(1)-2，-2)=max(3-2，-2)=1
    res=max(F(2)，res)=max(1，6)=6
i=3: 
    F(3)=max(F(2)+7，7)=max(1+7，7)=8
    res=max(F(2)，res)=max(8，6)=8
i=4: 
    F(4)=max(F(3)-15，-15)=max(8-15，-15)=-7
    res=max(F(4)，res)=max(-7，8)=8
以此类推
最终res的值为8


function FindGreatestSumOfSubArray(array)
{
    var len = array.length;
    
    if(len < 1) {
        return;
    }
    
    // 连续子数组的和
    var sum = array[0];
    // 最大值的连续子数组的和
    var maxSum = array[0];
    
    for(var i = 1; i < array.length; i++) {
        // 判断连续子数组的值和当前值的大小 如果当前值大 
        //     连续子数组就从它开始一个新的连续子数组 否则就继续加上当前的值
        // 防止之前连续的子数组的和是负值 如果是负值就开始新的连续子数组
        sum = Math.max(sum + array[i], array[i]);
        
        // 判断之前的连续子数组的最大值与现在的连续子数组的最大大小
        maxSum = Math.max(sum, maxSum);
    }
    return maxSum;
}




function FindGreatestSumOfSubArray(array)
{
    var len = array.length;
    
    if(len < 1) {
        return;
    }
    
    var max = array[0], // 存储连续数组最大的值
        pre = array[0]; // 一个连续数组之前的和
    
    for(var i = 1; i < len; i++) {
        
        // 如果之前的子数组和小于0 那么就重新开始一个连续的数组
        if(pre < 0) {
            pre = 0;
        }
        
        //  过去子数组的总和加上当前值 与 最大值的比较
        max = Math.max(pre + array[i], max);
        pre = pre + array[i];     
    }
    
    return max;
} 


动态规划比较适合用来求解最优问题，比如求最大值、最小值等等。它可以非常显著地降低时间复杂度，提高代码的执行效率。

详解: http://www.sohu.com/a/153858619_466939
详解: https://www.jianshu.com/p/69669c7bd69e




31. 
 function NumberOf1Between1AndN_Solution(n)
{
    if(n < 1) {
        return 0;
    }
    
    var count = 0,
        num;
    
    for(var i = 1; i <= n; i++) {
        
        // 赋值给num进行操作
        num = i;

        // 计算数值中1的个数
        while(num > 0) {
            // 取余看看数字最后一位是否存在1
            if((num % 10) === 1) {
            count ++;
            }
            // 去掉数值的最后一位
            num = Math.floor(num / 10);
        }
    }

    return count;
}




//主要思路：设定整数点（如1、10、100等等）作为位置点i（对应n的各位、十位、百位等等），分别对每个数位上有多少包含1的点进行分析
//根据设定的整数位置，对n进行分割，分为两部分，高位n/i，低位n%i
//当i表示百位，且百位对应的数>=2,如n=31456,i=100，则a=314,b=56，此时百位为1的次数有a/10+1=32（最高两位0~31），每一次都包含100个连续的点，即共有(a%10+1)*100个点的百位为1
//当i表示百位，且百位对应的数为1，如n=31156,i=100，则a=311,b=56，此时百位对应的就是1，则共有a%10(最高两位0-30)次是包含100个连续点，当最高两位为31（即a=311），本次只对应局部点00~56，共b+1次，所有点加起来共有（a%10*100）+(b+1)，这些点百位对应为1
//当i表示百位，且百位对应的数为0,如n=31056,i=100，则a=310,b=56，此时百位为1的次数有a/10=31（最高两位0~30）
//综合以上三种情况，当百位对应0或>=2时，有(a+8)/10次包含所有100个点，还有当百位为1(a%10==1)，需要增加局部点b+1
//之所以补8，是因为当百位为0，则a/10==(a+8)/10，当百位>=2，补8会产生进位位，效果等同于(a/10+1)
????????????????????????????????????




32. 
思路: 
所以在这里自定义一个比较大小的函数，比较两个字符串s1, s2大小的时候，先将它们拼接起来，比较s1+s2,和s2+s1那个大，如果s1+s2大，那说明s2应该放前面，所以按这个规则，s2就应该排在s1前面。
    

function PrintMinNumber(numbers)
{
    var len = numbers.length;
    
    if(len === 0) {
        return '';
    }
    
    // 确定位置 当  
    for(var i = 0; i < len - 1; i++) {
        for(var j = i + 1; j < len; j++) {
            
            var a = numbers[i] + '' + numbers[j];
            var b = numbers[j] + '' + numbers[i];
            
            // 把前一个数和后一个数拼接起来的数 然后再与后一个数和前一个数拼接起来的数比较大小 谁小谁在前面
            if(+a > +b) {
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
        }
    }
    
    var str = '';
    for(var i = 0; i < len; i++) {
        str += numbers[i];
    }
    
    return + str;
}




33. 
思路: 
主要在于理解丑数的概念，只包含因子2、3和5的数称作丑数，那么我们可以先把因子2、3和5分离出来，那么剩下的就是其他因子，看是否为1，为1的话说明没有其他因子，那就为丑数。不是1的话说明有其他因子，那么就不是丑数。

第一种暴力解法，缺点是连非丑数的也计算力，会超时。

第二种用到了动态规划的思想，把前面的丑数存着，生成后面的丑数。t2,t3,t5是判断点，用于判断从何处开始选出并乘以对应因子肯定会大于当前数组中最大丑数，而前面的丑数不用考虑。


function GetUglyNumber_Solution(index)
{
    var num = 0;
    var count = 0;
        
    // 3 5 8
    while(count < index) {
        
        // 每个累加的数字
        num++;
        
        if(isUglyNumber(num)) {
            count++;
        }   
    }
    
    return num;
}
function isUglyNumber(num) {
    
    //判断是否为丑数
    while(num % 2 === 0) {
        num = num / 2;
    }
    while(num % 3 === 0) {
        num = num / 3;
    }
    while(num % 5 === 0) {
        num = num / 5;
    }
    
    // 判断最后剩余的数字是否为1
    return num === 1;
}




// 动态规划 由当前的丑树由前面的丑数得出
function GetUglyNumberSolution(index) {

    // 有序的丑数字数组
    var res = [1];

    // 三个队列的指针
    var t2 = 0,
        t3 = 0,
        t5 = 0;

    // 填充丑数数组    
    for(var i = 1; i < index; i++) {
        
        // res[i] * t2/t3/t5 的值中选出最小的放到丑数数组中 然后指针右移
        res[i] = Math.min(res[t2] * 2, res[t3] * 3, res[t5] * 5);

        // 怎么判断让那个指针移动? 判断丑数数组中的当前的值 * 2/3/5 和队列中的值是否一致 一致的话就指针都右移
        if(res[t2] * 2 === res[i]) {
            t2 ++;
        }
        if(res[t3] * 3 === res[i]) {
            t3 ++;
        }
        if(res[t5] * 5 === res[i]) {
            t5 ++;
        }
    }     

    // 为什么是index-1?  因为是丑数数组第一位是1且 输入1输出也是1 所以要index-1 
    return res[index - 1];
}

详解: https://www.nowcoder.com/questionTerminal/6aa9e04fc3794f68acf8778237ba065b

    

34. 

function FirstNotRepeatingChar(str) {
    if(str.length <= 0) {
        return -1;
    }
    var len = str.length;
    var obj = {};
    for(var i = 0; i < len; i++) {
        if(!obj[str[i]]) {
            obj[str[i]] = 1;
        }else {
            obj[str[i]] ++;
        }
    }
    
    for(var prop in obj) {
        if(obj[prop] === 1) {
            return str.indexOf(prop);
        }
    }
    return -1;
}

// 只出现一次的话 lastIndexOf和indexOf的是一样的
function FirstNotRepeatingChar(str) {
    var len = str.length;
    for(var i = 0; i < len; i++) {
        if(str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
            return str.indexOf(str[i]);
        }
    }
    return -1;
}
 



35. 
?????????????????????????????????




36.
有个思路，不需要存储链表的额外空间。也不需要提前知道链表的长度。看下面的链表例子：
0-1-2-3-4-5-null
a-b-4-5-null
代码的ifelse语句，对于某个指针p1来说，其实就是让它跑了连接好的的链表，长度就变成一样了。
如果有公共结点，那么指针一起走到末尾的部分，也就一定会重叠。看看下面指针的路径吧。
p1： 0-1-2-3-4-5-null(此时遇到ifelse)-a-b-4-5-null
p2:  a-b-4-5-null(此时遇到ifelse)0-1-2-3-4-5-null
因此，两个指针所要遍历的链表就长度一样了！ 
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(pHead1, pHead2)
{
    var p1 = pHead1,
        p2 = pHead2;
    while(p1 != p2) {
        p1 = (p1 !== null) ? p1.next : pHead2;
        p2 = (p2 !== null) ? p2.next : pHead1;
    }
    return p1;
}


思路: 先在长的链表上跑，知道长的和短的一样长，再一起跑，判断节点相等的时候就可以了。
找出2个链表的长度，然后让长的先走两个链表的长度差，然后再一起走
（因为2个链表用公共的尾部）
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindFirstCommonNode(pHead1, pHead2)
{
    var pLong = pHead1,
        pShort = pHead2;
    
    var len1 = returnLen(pHead1),
        len2 = returnLen(pHead2),
        pLen = len1 - len2;
    
    if(len1 < len2) {
        pLong = pHead2;
        pShort= pHead1;
        pLen = len2 - len1;
    }
    
    while(pLen--) {
        pLong = pLong.next;
    }
    
    while(pLong !== null) {
        if(pLong.val === pShort.val) {
            return pLong;
        }
        pLong = pLong.next;
        pShort = pShort.next;
    }
    
    return null;
}
function returnLen(pHead) {
    var len = 0;
    while(pHead !== null) {
        pHead = pHead.next;
        len ++;
    }
    return len;
}




37. 
暴利解法
function GetNumberOfK(data, k)
{
    var len = data.length,
        num = 0;
    for(var i = 0; i < len; i++) {
        if(data[i] === k) {
            num ++;
        }
    }
    return num;
}


// 二分查找方        ??????????????????在剑指offer上未通过
function GetNumberOfK(data, k){ 

    if(data.length === 0) {
        return 0;
    }

    var len = data.length,
        mid = Math.floor(len / 2);
    var start = 0, // k第一次出现的下标
        end = data.length - 1; // k最后一次出现的下标
    
    while(start <= end) {
        
        // 递归出口
        if(data[start] === data[end]) {
            console.log(11);
            break;
        }

        if(k > data[mid]) {
            start = mid + 1;
        }
        if(k < data[mid]) {
            end = mid - 1;
        }
        mid = Math.floor( (start + end) / 2 );

    }

    // 统计数字
    var num = 0;
    for(var i = start; i <= end; i++) {
        num ++;
    }
    return num;
}
console.log(GetNumberOfK([1, 1, 1, 2, 3, 3], 1))
// return是结束一个方法
// continue是中止本次循环 接着开始下一次循环 
// break则是完全中止循环




38. 
// 递归的做法 
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot)
{
    if(pRoot === null) {
        return 0;
    }
    var left = TreeDepth(pRoot.left) + 1;
    var right = TreeDepth(pRoot.right) + 1;
    return Math.max(left, right);
}


//非递归 层次遍历   ??????????????????在剑指offer上未通过
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot)
{
    if(pRoot === null) {
        return 0;
    }
    
    var queue = [];
    queue.push(pRoot)；
    var depth = 0;
    while(queue.length !== 0) {
        var size = queue.length;
        while(size > 0) {
            var current = queue.shift();
            if(current.left !== null) {
                queue.push(current.left);
            }
            if(current.right !== null) {
                queue.push(current.right);
            }
            size --;
        }
        
        depth ++;
    }
    return depth;
}




39. 
平衡树，即平衡二叉树（Balanced Binary Tree），具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。
平衡二叉树的常用算法有红黑树、AVL、Treap、伸展树、SBT等。


第一种方法：
　　正常思路，应该会获得节点的左子树和右子树的高度，然后比较高度差是否小于1。
　　可是这样有一个问题，就是节点重复遍历了，影响效率了。
(
这种做法有很明显的问题，在判断上层结点的时候，会多次重复遍历下层结点，增加了不必要的开销。如果改为从下往上遍历，如果子树是平衡二叉树，则返回子树的高度；如果发现子树不是平衡二叉树，则直接停止遍历，这样至多只对每个结点访问一次)
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function IsBalanced_Solution(pRoot)
{
    if(pRoot === null) {
        return true;
    }
    var pLeftLen = TreeDepth(pRoot.left);
    var pRightLen = TreeDepth(pRoot.right);
    
    return Math.abs(pLeftLen - pRightLen) <= 1 && IsBalanced_Solution(pRoot.left) && IsBalanced_Solution(pRoot.right);
}
function TreeDepth(pRoot) {
    if(pRoot === null) {
        return 0
    }
    var pLeft = TreeDepth(pRoot.left) + 1;
    var pRight = TreeDepth(pRoot.right) + 1;
    return Math.max(pLeft, pRight);
}




40. 
第一种方法：使用js中的indexOf()和lastIndexOf(),只要两个相等，就是只出现一次的数。 function FindNumsAppearOnce(array) { 
    var res = []; 
    var len = array.length; 
    for(var i = 0; i < len ;i++) { 
        if(array.indexOf(array[i]) === array.lastIndexOf(array[i])) { res.push(array[i]); 
        } 
    } 
    return res; 
}

第二种方法：使用map记录下每个数的次数，占空间。 
function FindNumsAppearOnce(array) { 
    var map = {}; 
    var res = []; 
    var len = array.length;
    for(var i = 0; i < len; i++) {
        if(!map[array[i]]) {
            map[array[i]] = 1;
        }else {
            map[array[i]] ++;
        }
    }
    for(var prop in map) {
        if(map[prop] === 1) {
            res.push(prop);
        }
    }
    return res;
}


第三种方法 位运算操作符？？？？????



41. 
//左神的思路，双指针问题
//当总和小于sum，大指针继续+
//否则小指针+
 function FindContinuousSequence(sum) {
    var plow = 1;
    var phigh = 2;
    var result = [];
    while(phigh > plow) {
        var cur = (phigh + plow) / 2 * (phigh - plow + 1);    
        if(cur === sum) {
            var arr = [];
            for(var i = plow; i <= phigh; i++) {
                arr.push(i);
            }
            result.push(arr);
            plow ++;
        }else if(cur < sum) {
            phigh ++;
        }else if(cur > sum) {
            plow ++;
        }
    }
    return result;
}




42. 
function FindNumbersWithSum(array, sum)
{
    if(array === null || array.length < 2) {
        return [];
    }
    var plow = 0,
        phigh = array.length - 1,
        list = [];
    
    while(plow < phigh) {
        var current = array[plow] + array[phigh];
        if(current === sum) {
            list.push(array[plow]);
            list.push(array[phigh]);
            break;
        }else if(current < sum) {
            plow ++;
        }else {
            phigh --;
        }
    }
    return list;
}




43. 
function LeftRotateString(str, n)
{
    if(str === null || str.length === 0) {
        return "";
    }
     var arr = str.split("");
     var spliceArr = arr.splice(0, n);
     return (arr.concat(spliceArr)).join("");
}


function LeftRotateString(str, n)
{
    if(str === null || str.length === 0) {
        return "";
    }
    var len = str.length;
    var temp = str.slice(0, n);
    return str.substr(n, len).concat(temp);

}




44. 
function ReverseSentence(str) {
    return str.split(' ').reverse('').join(' ');
}




45. 
// 1. 排序
// 2. 计算0的个数
// 3. 将除0之外剩余部分取出
// 4. 如果存在相等元素，不是顺子
// 5. 如果缺失元素个数大于0的个数，不是顺子，反之就是顺子
//       （也就是计算最大元素和最小元素的差，需要小于0的个数加1，再加上非0元素的个数） 
function IsContinuous(numbers) {

    // 次数
    var times = [-5];
    var len = numbers.length;
    var max = -1,
        min = 13;

    // 如果数字长度不为5 则返回false    
    if(len !== 5) {
        return false;
    }    

    // 占位次数    
    for(var i = 0; i < 13; i++) {
        times.push(0);
    }

    for(var i = 0; i < len; i++) {
        
        times[numbers[i]] ++;
        
        // 如果出现重复的数字或者0的出现次数大于5 则返回false  -5 -4 -3 -2 -1 0
        if(times[numbers[i]] > 1) {
            return false;
        }
        
        // 如果数字为0 则跳出此次循环
        if(numbers[i] === 0) {
            continue;
        }

        if(numbers[i] > max) {
            max = numbers[i];
        }
        if(numbers[i] < min) {
            min = numbers[i];
        }
    }

    return max - min < 5;
}




46. 
?? 还没理解
function LastRemaining_Solution(n, m)
{
    // 没有小朋友返回-1
    if(n === 0) {
        return -1;
    }

    // 只有一个人就返回0
    if(n === 1) {
        return 0;
    }

    return (LastRemaining_Solution(n-1, m) + m) % n;
}




47. 
function Sum_Solution(n)
{
    return n + (n < 1 ? 0 : Sum_Solution(n - 1));
}  


function Sum_Solution(n)
{
    var res = n;
    return n > 0 && n + Sum_Solution(n - 1);
}  




48. 
?? 还没理解
function Add(num1, num2)
{
    do{
        var sum, carry;
        sum = num1 ^ num2;
        carry = (num1 & num2) << 1;
        num1 = sum;
        num2 = carry;
    }while(num2 !== 0)
    return num1;
}




49. 
<!-- 要求不能使用字符串转换整数的库函数 -->
function StrToInt(str)
{
    return Number(str) ? parseInt(str) : 0;
}


<!-- 正则 -->
 function StrToInt(str)
{
    if(str === '-0') {
        return 0;
    }
    var reg = /^[\+\-]?[0-9]+$/;
    if(!reg.test(str)) {
        return 0;
    }else {
        if(str.charAt(0) === '+') {
            return str.substring(1);
        }else {
            return str;
        }
    }
}
