class Rect {
    constructor (center, width, length) {
        this.center = center;
        this.width = width;
        this.length = length;
    }

    PushX(X)
    {
        if (this.center.x - X < 0)
        {
            X = this.center.x + this.width / 2;
        } else {
            X = this.center.x - this.width / 2;
        }
        return X;
    }

    PushZ(Z)
    {
        if (this.center.z - Z < 0)
            Z = this.center.z + this.length / 2;
        else
            Z = this.center.z - this.length / 2;
        return Z;
    }

    Contain(X, Z)
    {
        if (Math.abs(this.center.x - X) < this.width / 2 
            && Math.abs(this.center.z - Z) < this.length / 2)
            return true;
        return false;
    }

    PushDirection(X, Z)
    {
        if (this.width / 2 - Math.abs(this.center.x - X) < this.length / 2 - Math.abs(this.center.z - Z) )
            return true;
        return false;
    }
}

export default Rect;