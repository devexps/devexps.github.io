---
title: The interface and inheritance of Golang
description: The interface and inheritance of Golang
tags: [go, golang, c, c++, interface, inheritance]
hide_table_of_contents: false
---
<!--truncate-->
## Golang interface and inheritance

Golang is a C-like language designed by Google. It's a language used to replace Python. It's more C, more process-oriented, not C++, and not so object-oriented. However, I still want to achieve something similar to C++ Interface. In fact, it can be done, although the writing method is more C.

### Single inheritance
Single inheritance simply means that there is only one parent class. In terms of specific implementation, I have done two experiments:

1. Only interface
2. Has a base class

#### 1. Only interface

In C++, the pseudo-code is implemented as:

```cpp
typedef struct interface;

interface IFruit {
    virtual string GetName() const = 0;
    virtual void SetName(string name) = 0;
    
    virtual Type GetType() const = 0;
};

class Apple : public IFruit {
public:
    virtual string GetName() const {}
    virtual void SetName(string name) {}

    virtual Type GetType() const {}
};
```

The implementation in Golang is probably like this:

Let's define an interface first:

````go
type Fruit interface {
    GetName() string
    SetName(name string)
	
    GetType() Type
}
````

We have an Apple object:

```go
type Apple struct {
    name    string
}

func NewApple(name string) *Apple {
    c := &Apple{}
    c.name = name
    return c
}

func (c *Apple) GetName() string {
    return c.name
}

func (c *Apple) SetName(name string) {
    c.name = name
}

func (c *Apple) GetType() Type {
    return AppleType
}
```

We have a NewApple here for creating new apples, and this method can be used in two ways:

1. Assign to interface
    ```go
    var fruitApple Fruit
    fruitApple = NewApple("big")
    ```
2. Assign to yourself
    ```go
    apple := NewApple("big")
    ```

You can also use the factory method NewFruit provided by the base class to create fruits:

```go
apple := NewFruit(AppleType, "big")
banana := NewFruit(BananaType, "big")
```

#### 2. Has a base class

In C++, the pseudo-code is implemented as:

```cpp
typedef struct interface;

interface IVehicle {
    virtual string GetName() const = 0;
    virtual void SetName(string name) = 0;

    virtual Type GetType() const = 0;

    virtual int GetWheelCount() const = 0;
    virtual void SetWheelCount(count int) = 0;

    virtual string ToString() const = 0;
};

class VehicleBase: public IVehicle {
    virtual string ToString() const {}
};

class Bus : public VehicleBase {
public:
    virtual string GetName() const {}
    virtual void SetName(string name) {}

    virtual Type GetType() const {}

    virtual int GetWheelCount() const {}
    virtual void SetWheelCount(count int) {}

    virtual string ToString() const {}
};
```

The implementation in Golang is probably like this:

Let's define an interface first:

```go
type Vehicle interface {
    GetType() Type
	
    GetName() string
    SetName(name string)

    GetWheelCount() int
    SetWheelCount(count int)
	
    ToString() string
}
```

And another base class:

```go
type vehicleBase struct {
    wheelCount int
}

func (c *vehicleBase) GetWheelCount() int {
    return c.wheelCount
}

func (c *vehicleBase) SetWheelCount(count int) {
    c.wheelCount = count
}

func (c *vehicleBase) ToString() string {
    return "vehicle -> "
}
```

Then let's take some buses. Yes, it combines base classes **vehicleBase**.

```go
type Bus struct {
    vehicleBase
    name string
}
```

Here the bus overrides the base class, and we can call it like this: b.vehicleBase.ToString()

```go
func (b *Bus) ToString() string {
    str := fmt.Sprintf("Bus -> %s", b.GetName())
    return b.vehicleBase.ToString() + str
}
```

### Multiple inheritance

Multiple inheritance means having more than one parent class.

In C++, the pseudo-code is implemented as:

```cpp
class Father {
    virtual string GetName() const {}
    virtual string Say() const {}
};

class Mother {
    virtual string GetName() const {}
    virtual string Say() const {}
};

class Child : public Father, public Mother {
    virtual string GetName() const {}
    virtual string Say() const {
        Father::GetName();
        Mother::GetName();
    }
};
```

In Golang, let's make dad first:

```go
type Father struct {
}

func NewFather() *Father {
    return &Father{}
}

func (c *Father) GetName() string {
    return "ThangN"
}

func (c *Father) Say() string {
    return "I am " + c.GetName()
}
```

So let's start with a mother:

```go
type Mother struct {
}

func NewMother() *Mother {
    return &Mother{}
}

func (m *Mother) GetName() string {
    return "HienNTT"
}

func (m *Mother) Say() string {
    return "I am " + m.GetName()
}
```

Now, let's make a parent's successor:

```go
type Child struct {
    *Mother
    Father
}

func NewChild() *Child {
    return &Child{}
}

func (c *Child) GetName() string {
    return "BaoNG"
}

func (c *Child) Say() string {
    return "I am " + c.GetName() + ", My Father is " + c.Father.GetName() + ", My Mother is " + c.Mother.GetName()
}
```

In fact, it's nothing, the key lies in anonymous members ***Mother** and **Father**. Here, there are two ways of inheritance:

**Non-pointer inheritance**

> 1. When the derived class does not override the member method of the base class, the corresponding member method is inherited.
> 2. The derived class can directly call the member method of the base class. For example, if the base class has a member method Base.Func(), then Derived.Func() is equivalent to Derived.Base.Func().
> 3. If the name of the member method of the derived class is the same as that of the base class, the base class method will be overwritten or hidden. For example, both the base class and the derived class have a member method Func(), then Derived.Func() will only Call the Func() method of the derived class. If you want to call the base class version, you can call it through Derived.Base.Func().

**Combination of pointers**

> 1. The combination of the base class using the pointer method still has the effect of derivation, but when the derived class creates an instance, a pointer to the base class instance needs to be provided externally.
> 2. Other rules are the same as for non-pointer combinations.


Code repository: [https://github.com/devexps/go-examples/inheritance](https://github.com/devexps/go-examples/tree/main/inheritance)