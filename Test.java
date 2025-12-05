// 1. 抽象的 Shape 父類別
abstract class Shape {
    abstract double getArea(); // 抽象方法，強制子類別實作

    void display() {
        System.out.println("Area: " + getArea());
    }
}

// 2. Circle 子類別
class Circle extends Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }

    @Override
    double getArea() { 
        return Math.PI * radius * radius; 
    }
}

// 3. Rectangle 子類別
class Rectangle extends Shape {
    double width, height;
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    double getArea() { 
        return width * height; 
    }
}

// 4. 主程式 Test 類別 (包含 main 方法)
public class Test {
    public static void main(String[] args) {
        // 建立物件 (多型)
        Shape shape1 = new Circle(5);
        Shape shape2 = new Rectangle(5, 5);

        System.out.println("--- 分別呼叫 ---");
        shape1.display(); // 會自動執行 Circle 的 getArea()
        shape2.display(); // 會自動執行 Rectangle 的 getArea()

        System.out.println("\n--- 迴圈呼叫 ---");
        // 建立物件陣列
        Shape[] shapes = {shape1, shape2}; 
        
        // 用 for-each 迴圈遍歷
        for (Shape shape : shapes) {
            shape.display();
        }
    }
}