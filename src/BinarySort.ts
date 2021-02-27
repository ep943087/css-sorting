export class BinarySort{

  private numbers: number[];
  private children: HTMLDivElement[];
  private interval: number;
  private index1: number;
  private index2: number;
  private swapping: boolean;
  private almostSwap: boolean;


  constructor(private parent: HTMLDivElement, private size: number = 10){
    this.numbers = [];
    this.children = [];
    this.interval = -1;
    this.index1 = 0;
    this.index2 = 0;
    this.swapping = false;
    this.almostSwap = false;
    this.reset();
  }
  private reset(): void{
    if(this.interval !== -1)
      clearInterval(this.interval);
    this.numbers = [];
    this.children = [];
    this.interval = -1;
    this.index1 = this.size - 1;
    this.index2 = 0;

    this.initArray();
    this.children = new Array<HTMLDivElement>();
    this.parent.innerHTML = "";
    for(let i=0;i<this.size;i++){
      this.addNumber(this.numbers[i],i);
    }
  }

  private removeComparing(){
    for(let i=0;i<this.children.length;i++){
      this.children[i].classList.remove('comparing');
      this.children[i].classList.remove("swapping");
    }
  }

  private addComparing(index: number): void{
    const elem = this.getElementByOrder(index)
    if(elem !== null && !elem.classList.contains('comparing'))
      elem.classList.add('comparing');
  }

  private addSwapping(index: number): void{
    const elem = this.getElementByOrder(index)
    if(elem !== null)
      elem.classList.add('swapping');
  }

  private addNumber(num: number, order: number): void{
    const numDiv = document.createElement('DIV') as HTMLDivElement;
    numDiv.innerText = num.toString();
    numDiv.classList.add('number');
    numDiv.style.order = order.toString();
    this.parent.appendChild(numDiv);
    this.children.push(numDiv);
  }

  private swap(i: number, j: number): void{
    const a = this.getElementByOrder(i);
    const b = this.getElementByOrder(j);
    if(a === null || b === null) return;
    const order1 = a.style.order;
    a.style.order = b.style.order;
    b.style.order = order1;
  }

  private getElementByOrder(order: number): HTMLDivElement | null{
    for(const child of this.children){
      if(child.style.order === order.toString()){
        return child;
      }
    }
    return null;
  }

  private initArray(): void{
    this.numbers = new Array<number>();

    for(let i=0;i<this.size;i++){
      const num = Math.floor(Math.random()*1000);
      this.numbers.push(num);
    }
    console.log(this.numbers);
  }

  private compare(i: number, j: number): boolean{
    const numi = this.getElementByOrder(i);
    const numj = this.getElementByOrder(j);
    if(numi === null || numj === null || numi.textContent === null || numj.textContent === null) return false;
    return parseInt(numi.textContent) > parseInt(numj.textContent);
  }

  private sort = (): void => {
    this.removeComparing();
    if(this.index2 >= this.index1){
      this.index1--;
      this.index2 = 0;
    }
    if(this.index1 <= 0){
      return this.stop();
    }

     if(this.swapping){
      if(this.almostSwap){
        this.addSwapping(this.index2);
        this.addSwapping(this.index2+1);
        this.almostSwap = false;
      } else{
        this.swap(this.index2,this.index2+1);
        this.swapping = false;
        this.index2++;
        // if(this.index2 >= this.index1){
        //   this.index1--;
        //   this.index2 = 0;
        // }
      }
    }

    if(!this.swapping){
      this.addComparing(this.index2);
      if(this.index2 < this.index1)
        this.addComparing(this.index2+1);
      if(this.compare(this.index2,this.index2+1)){
        this.swapping = true;
        this.almostSwap = true;
      } else{
        this.index2++;
      }
    }
  }

  public start(): void{
    this.interval = setInterval(this.sort, 1000)
  }

  public stop(): void{
    clearInterval(this.interval);
  }
}